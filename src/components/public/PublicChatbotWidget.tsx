"use client";

import { useState, useRef, useEffect, useMemo } from "react";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const WELCOME: BotMessage = {
  id: "welcome",
  role: "bot",
  content:
    "Bonjour 👋 Je peux vous expliquer rapidement comment fonctionne Deep Training For TOEIC et vous orienter vers une prise de rendez-vous.",
};

interface BotMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  cta_label?: string;
  cta_url?: string;
  should_book?: boolean;
  error?: boolean;
}

// Inline markdown → safe HTML (no raw ** or ## shown)
function renderMarkdown(text: string): string {
  const blocks = text.split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.trim().split("\n");
      if (!lines.length || !lines[0]) return "";
      if (/^### /.test(lines[0])) return `<h3>${inline(lines[0].slice(4))}</h3>`;
      if (/^## /.test(lines[0])) return `<h2>${inline(lines[0].slice(3))}</h2>`;
      if (/^# /.test(lines[0])) return `<h1>${inline(lines[0].slice(2))}</h1>`;
      if (lines.every((l) => /^[-•*]\s/.test(l.trim()) || !l.trim())) {
        const items = lines
          .filter((l) => /^[-•*]\s/.test(l.trim()))
          .map((l) => `<li>${inline(l.trim().slice(2))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (lines.every((l) => /^\d+\.\s/.test(l.trim()) || !l.trim())) {
        const items = lines
          .filter((l) => /^\d+\.\s/.test(l.trim()))
          .map((l) => `<li>${inline(l.trim().replace(/^\d+\.\s/, ""))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }
      return `<p>${lines.map(inline).join("<br/>")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

function inline(t: string): string {
  return t
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function useTypewriter(text: string, active: boolean) {
  const [slice, setSlice] = useState(active ? "" : text);
  const [done, setDone] = useState(!active);
  const ref = useRef({ text, active, idx: 0, timer: null as ReturnType<typeof setTimeout> | null });

  useEffect(() => {
    ref.current.text = text;
    ref.current.active = active;
    const r = ref.current;
    if (r.timer) clearTimeout(r.timer);
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlice(text);
       
      setDone(true);
      return;
    }
    r.idx = 0;
    const tick = () => {
      r.idx += Math.ceil(Math.random() * 3 + 1);
       
      setSlice(r.text.slice(0, r.idx));
      if (r.idx < r.text.length) {
        r.timer = setTimeout(tick, 16);
      } else {
         
        setSlice(r.text);
         
        setDone(true);
      }
    };
     
    setDone(false);
     
    setSlice("");
    r.timer = setTimeout(tick, 16);
    return () => { if (r.timer) clearTimeout(r.timer); };
  }, [text, active]);

  return { slice: active ? slice : text, done };
}

function BotBubble({ msg, streaming }: { msg: BotMessage; streaming: boolean }) {
  const { slice, done } = useTypewriter(msg.content, streaming);
  const html = useMemo(() => renderMarkdown(slice), [slice]);

  return (
    <div className="wcb-bubble wcb-bubble-bot">
      <div className="wcb-md" dangerouslySetInnerHTML={{ __html: html }} />
      {!done && <span className="wcb-cursor" />}
      {done && msg.should_book && msg.cta_url && (
        <a
          href={msg.cta_url}
          target="_blank"
          rel="noopener noreferrer"
          className="wcb-cta"
        >
          {msg.cta_label ?? "Prendre rendez-vous"}
        </a>
      )}
    </div>
  );
}

export function PublicChatbotWidget() {
  const [compactMobile, setCompactMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia(
      "(max-width: 900px), (prefers-reduced-motion: reduce)"
    );
    const update = () => setCompactMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingId]);

  useEffect(() => {
    if (compactMobile) setOpen(false);
  }, [compactMobile]);

  async function send(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
    setInput("");

    const userMsg: BotMessage = {
      id: `u-${seqRef.current++}`,
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${BASE}/public/chatbot-rdv/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text.trim(),
          page_url: typeof window !== "undefined" ? window.location.href : "",
          visitor_context: { source: "public_site_chatbot" },
        }),
      });

      if (!res.ok) throw new Error("api_error");

      const data: { content: string; should_book_call: boolean; cta_label: string; cta_url: string } =
        await res.json();

      const botId = `b-${seqRef.current++}`;
      const botMsg: BotMessage = {
        id: botId,
        role: "bot",
        content: data.content,
        should_book: data.should_book_call,
        cta_label: data.cta_label,
        cta_url: data.cta_url,
      };
      setStreamingId(botId);
      setMessages((prev) => [...prev, botMsg]);
      const duration = Math.min(data.content.length * 18 + 600, 10000);
      setTimeout(() => setStreamingId(null), duration);
    } catch {
      const errId = `e-${seqRef.current++}`;
      setMessages((prev) => [
        ...prev,
        {
          id: errId,
          role: "bot",
          error: true,
          content:
            "Je n'arrive pas à répondre pour le moment. Vous pouvez quand même prendre rendez-vous directement.",
          should_book: true,
          cta_label: "Prendre rendez-vous",
          cta_url: "/contact",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (compactMobile) {
    return null;
  }

  return (
    <>
      {/* Floating button */}
      <button
        className="wcb-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir l'assistant"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="wcb-window">
          {/* Header */}
          <div className="wcb-header">
            <div className="wcb-header-avatar">IA</div>
            <div className="wcb-header-info">
              <div className="wcb-header-title">Assistant Deep Training TOEIC</div>
              <div className="wcb-header-sub">Posez votre question ou prenez rendez-vous.</div>
            </div>
            <button className="wcb-close" onClick={() => setOpen(false)} aria-label="Fermer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="wcb-messages">
            {messages.map((msg) =>
              msg.role === "user" ? (
                <div key={msg.id} className="wcb-bubble wcb-bubble-user">
                  {msg.content}
                </div>
              ) : (
                <BotBubble
                  key={msg.id}
                  msg={msg}
                  streaming={streamingId === msg.id}
                />
              )
            )}
            {sending && (
              <div className="wcb-bubble wcb-bubble-bot">
                <div className="wcb-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Book CTA always visible */}
          <div className="wcb-book-bar">
            <a href="/contact" className="wcb-cta wcb-cta-full">
              Prendre rendez-vous
            </a>
          </div>

          {/* Input */}
          <div className="wcb-input-row">
            <input
              className="wcb-input"
              placeholder="Écrivez votre message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              disabled={sending}
            />
            <button
              className="wcb-send"
              onClick={() => send(input)}
              disabled={sending || !input.trim()}
              aria-label="Envoyer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .wcb-fab {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 3.25rem;
          height: 3.25rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a8fff, #0057cc);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(26,143,255,0.45);
          z-index: 9999;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .wcb-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(26,143,255,0.6);
        }

        .wcb-window {
          position: fixed;
          bottom: 5.5rem;
          right: 1.5rem;
          width: 360px;
          max-width: calc(100vw - 2rem);
          max-height: 520px;
          background: #0f1624;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.55);
          z-index: 9998;
          animation: wcb-pop 0.2s ease;
        }
        @keyframes wcb-pop {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .wcb-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1rem;
          background: linear-gradient(90deg, #0f1e3a, #0b1628);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .wcb-header-avatar {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          background: linear-gradient(135deg,#1a8fff,#0057cc);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wcb-header-info { flex: 1; min-width: 0; }
        .wcb-header-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #e2e8f0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .wcb-header-sub { font-size: 0.65rem; color: #64748b; margin-top: 1px; }
        .wcb-close {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transition: color 0.15s;
        }
        .wcb-close:hover { color: #e2e8f0; }

        .wcb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .wcb-bubble {
          max-width: 85%;
          padding: 0.6rem 0.85rem;
          border-radius: 0.75rem;
          font-size: 0.82rem;
          line-height: 1.6;
        }
        .wcb-bubble-user {
          align-self: flex-end;
          background: linear-gradient(135deg,#1a8fff,#0057cc);
          color: #fff;
          border-bottom-right-radius: 0.2rem;
        }
        .wcb-bubble-bot {
          align-self: flex-start;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          color: #cbd5e1;
          border-bottom-left-radius: 0.2rem;
        }

        .wcb-md p { margin: 0.3rem 0; }
        .wcb-md h1, .wcb-md h2, .wcb-md h3 {
          font-weight: 700; color: #e2e8f0; margin: 0.5rem 0 0.25rem;
        }
        .wcb-md h3 { font-size: 0.85rem; color: #60a5fa; }
        .wcb-md h2 { font-size: 0.9rem; }
        .wcb-md ul, .wcb-md ol { margin: 0.3rem 0 0.3rem 1.1rem; padding: 0; }
        .wcb-md li { margin: 0.15rem 0; }
        .wcb-md strong { color: #e2e8f0; font-weight: 700; }
        .wcb-md em { color: #94a3b8; font-style: italic; }
        .wcb-md code {
          background: rgba(255,255,255,0.08);
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
          font-size: 0.78rem;
        }

        .wcb-cursor {
          display: inline-block;
          width: 2px; height: 1em;
          background: #60a5fa;
          margin-left: 2px;
          vertical-align: middle;
          animation: wcb-blink 0.7s step-end infinite;
        }
        @keyframes wcb-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .wcb-dots { display:flex; gap:4px; align-items:center; padding:2px 0; }
        .wcb-dots span {
          width:6px; height:6px; border-radius:50%;
          background:#1a8fff;
          animation: wcb-bounce 1.2s infinite;
        }
        .wcb-dots span:nth-child(2){animation-delay:.2s}
        .wcb-dots span:nth-child(3){animation-delay:.4s}
        @keyframes wcb-bounce {
          0%,80%,100%{transform:translateY(0);opacity:.4}
          40%{transform:translateY(-5px);opacity:1}
        }

        .wcb-cta {
          display: inline-block;
          margin-top: 0.55rem;
          padding: 0.4rem 0.85rem;
          background: linear-gradient(135deg,#1a8fff,#0057cc);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .wcb-cta:hover { opacity: 0.88; }

        .wcb-book-bar {
          padding: 0.5rem 0.85rem 0.1rem;
          flex-shrink: 0;
        }
        .wcb-cta-full {
          display: block;
          text-align: center;
          margin-top: 0;
        }

        .wcb-input-row {
          display: flex;
          gap: 0.4rem;
          padding: 0.65rem 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .wcb-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          color: #e2e8f0;
          font-size: 0.8rem;
          padding: 0.45rem 0.7rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .wcb-input:focus { border-color: #1a8fff; }
        .wcb-input::placeholder { color: #475569; }
        .wcb-send {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          background: linear-gradient(135deg,#1a8fff,#0057cc);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s;
        }
        .wcb-send:disabled { opacity: 0.4; cursor: default; }
        .wcb-send:not(:disabled):hover { opacity: 0.85; }

        @media (max-width: 480px) {
          .wcb-window { right: 0.75rem; left: 0.75rem; width: auto; }
          .wcb-fab { bottom: 1rem; right: 1rem; }
        }
      `}</style>
    </>
  );
}
