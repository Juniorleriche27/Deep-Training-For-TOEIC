"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useRef, useMemo } from "react";
import { api } from "@/lib/api";
import type { ChatMessage, CoachContext } from "@/lib/types";

const QUICK_ACTIONS = [
  "Que dois-je faire aujourd'hui ?",
  "Explique-moi mon etape",
  "Rappelle-moi mes consignes",
  "Motive-moi",
  "Que reviser maintenant ?",
];

// Robust markdown → HTML, processes block by block then inline
function markdownToHtml(raw: string): string {
  // Split into paragraphs separated by blank lines
  const blocks = raw.split(/\n{2,}/);

  const processedBlocks = blocks.map((block) => {
    const lines = block.trim().split("\n");
    if (!lines.length || !lines[0]) return "";

    // Heading
    if (/^### /.test(lines[0])) {
      return `<h3>${inlineMarkdown(lines[0].replace(/^### /, ""))}</h3>`;
    }
    if (/^## /.test(lines[0])) {
      return `<h2>${inlineMarkdown(lines[0].replace(/^## /, ""))}</h2>`;
    }
    if (/^# /.test(lines[0])) {
      return `<h1>${inlineMarkdown(lines[0].replace(/^# /, ""))}</h1>`;
    }

    // Ordered list — all lines start with digit+dot
    if (lines.every((l) => /^\d+\.\s/.test(l.trim()) || l.trim() === "")) {
      const items = lines
        .filter((l) => /^\d+\.\s/.test(l.trim()))
        .map((l) => `<li>${inlineMarkdown(l.trim().replace(/^\d+\.\s/, ""))}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }

    // Unordered list — lines start with - or •
    if (lines.every((l) => /^[-•*]\s/.test(l.trim()) || l.trim() === "")) {
      const items = lines
        .filter((l) => /^[-•*]\s/.test(l.trim()))
        .map((l) => `<li>${inlineMarkdown(l.trim().replace(/^[-•*]\s/, ""))}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }

    // Mixed block — render line by line, collecting list runs
    const html: string[] = [];
    let listBuffer: string[] = [];
    let listType: "ul" | "ol" | null = null;

    function flushList() {
      if (!listBuffer.length) return;
      const tag = listType!;
      html.push(`<${tag}>${listBuffer.join("")}</${tag}>`);
      listBuffer = [];
      listType = null;
    }

    for (const line of lines) {
      const t = line.trim();
      if (/^#{1,3}\s/.test(t)) {
        flushList();
        const lvl = t.match(/^(#{1,3})\s/)![1].length;
        html.push(`<h${lvl}>${inlineMarkdown(t.replace(/^#{1,3}\s/, ""))}</h${lvl}>`);
      } else if (/^\d+\.\s/.test(t)) {
        if (listType && listType !== "ol") flushList();
        listType = "ol";
        listBuffer.push(`<li>${inlineMarkdown(t.replace(/^\d+\.\s/, ""))}</li>`);
      } else if (/^[-•*]\s/.test(t)) {
        if (listType && listType !== "ul") flushList();
        listType = "ul";
        listBuffer.push(`<li>${inlineMarkdown(t.replace(/^[-•*]\s/, ""))}</li>`);
      } else if (t === "") {
        flushList();
      } else {
        flushList();
        html.push(`<p>${inlineMarkdown(t)}</p>`);
      }
    }
    flushList();
    return html.join("");
  });

  return processedBlocks.filter(Boolean).join("\n");
}

// Handle inline markdown: bold, italic, inline code
function inlineMarkdown(text: string): string {
  return text
    // Bold+italic ***text***
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // Bold **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic *text* (not preceded/followed by *)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // Inline code `text`
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function useStreamingText(content: string, active: boolean) {
  const [slice, setSlice] = useState(content);
  const [animDone, setAnimDone] = useState(true);
  const stateRef = useRef({ content, active, index: 0, timer: null as ReturnType<typeof setTimeout> | null });

  useEffect(() => {
    stateRef.current.content = content;
    stateRef.current.active = active;
    const s = stateRef.current;
    if (s.timer) clearTimeout(s.timer);
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlice(content);
       
      setAnimDone(true);
      return;
    }
    s.index = 0;
    const advance = () => {
      s.index += Math.ceil(Math.random() * 3 + 1);
      const next = s.content.slice(0, s.index);
       
      setSlice(next);
      if (s.index < s.content.length) {
        s.timer = setTimeout(advance, 18);
      } else {
         
        setSlice(s.content);
         
        setAnimDone(true);
      }
    };
     
    setAnimDone(false);
    s.timer = setTimeout(advance, 18);
    return () => { if (s.timer) clearTimeout(s.timer); };
  }, [active, content]);

  return { slice: active ? slice : content, done: !active || animDone };
}

function StreamingMessage({ content, isStreaming }: { content: string; isStreaming: boolean }) {
  const { slice, done } = useStreamingText(content, isStreaming);
  const html = useMemo(() => markdownToHtml(slice), [slice]);

  return (
    <div className="coach-msg-content">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {!done && <span className="cursor-blink" />}
    </div>
  );
}

export default function AdherentCoachIaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyMessages, setHistoryMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<CoachContext | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageSeqRef = useRef(0);

  useEffect(() => {
    Promise.all([api.getChatHistory(), api.getCoachContext()]).then(([history, ctx]) => {
      setHistoryMessages(history);
      setContext(ctx);
    });
  }, []);

  const recentHistory = useMemo(() => {
    return historyMessages
      .filter((msg) => msg.content.trim())
      .slice(-8)
      .reverse();
  }, [historyMessages]);

  function startNewConversation() {
    setMessages([]);
    setInput("");
    setSendError("");
    setStreamingId(null);
  }

  function loadHistory() {
    setMessages(historyMessages);
    setSendError("");
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingId]);

  async function send(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
    setSendError("");
    const tempId = `tmp-${messageSeqRef.current++}`;
    const userMsg: ChatMessage = {
      id: tempId,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const reply = await api.sendChatMessage(text.trim());
      const replyWithStream = { ...reply, id: reply.id ?? `ai-${tempId}` };
      setStreamingId(replyWithStream.id);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== userMsg.id),
        { ...userMsg, id: `user-${tempId}` },
        replyWithStream,
      ]);
      // Clear streaming flag after animation (estimate: content.length * 20ms + buffer)
      const duration = Math.min(reply.content.length * 20 + 800, 12000);
      setTimeout(() => setStreamingId(null), duration);
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      setSendError("Impossible d'envoyer le message. Vérifiez votre connexion et réessayez.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Coach IA</h1>
          <p className="page-sub">Assistant de programme contextuel, relie a l&apos;etape et aux scores.</p>
        </div>
        <div className="coach-page-actions">
          <button type="button" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold" onClick={loadHistory}>
            Historique
          </button>
          <button type="button" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold" onClick={startNewConversation}>
            Nouvelle conversation
          </button>
        </div>
      </div>

      <div className="chat-container">
        <section className="chat-main">
          <div className="chat-header">
            <div className="ai-avatar">IA</div>
            <div>
              <div className="chat-ai-name">Coach Deep Training For TOEIC</div>
              <div className="chat-ai-status">
                {context ? `En ligne - ${context.etape} - ${context.deadline}` : "Chargement..."}
              </div>
            </div>
            {context && (
              <div className="row" style={{ marginLeft: "auto" }}>
                <span className="badge badge-accent">{context.etape}</span>
                <span className="badge badge-gold">{context.deadline}</span>
              </div>
            )}
            <button type="button" className="coach-new-chat-btn" onClick={startNewConversation}>
              +
            </button>
          </div>

          <div className="chat-messages">
            {!messages.length && !sending && (
              <div className="coach-empty-state">
                <span className="coach-empty-kicker">Nouvelle conversation</span>
                <h2>Que veux-tu travailler maintenant ?</h2>
                <p>
                  Pose une question au Coach IA ou lance une action rapide. Ton historique reste accessible,
                  mais cette page demarre proprement comme un nouveau chat.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`msg ${msg.role === "user" ? "msg-user" : "msg-ai"}`}>
                <div
                  className="msg-avatar"
                  style={
                    msg.role === "assistant"
                      ? { background: "linear-gradient(135deg,var(--accent),#0070cc)", color: "#fff" }
                      : { background: "var(--accent-dim)", color: "var(--accent)" }
                  }
                >
                  {msg.role === "assistant" ? "IA" : "Moi"}
                </div>
                {msg.role === "assistant" ? (
                  <div className="msg-bubble msg-bubble-ai">
                    <StreamingMessage
                      content={msg.content}
                      isStreaming={streamingId === msg.id}
                    />
                  </div>
                ) : (
                  <div className="msg-bubble">{msg.content}</div>
                )}
              </div>
            ))}
            {sending && (
              <div className="msg msg-ai">
                <div className="msg-avatar" style={{ background: "linear-gradient(135deg,var(--accent),#0070cc)", color: "#fff" }}>IA</div>
                <div className="msg-bubble msg-bubble-ai">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <button key={action} className="qa-btn" onClick={() => send(action)}>
                {action}
              </button>
            ))}
          </div>

          {sendError && (
            <p style={{ color: "var(--danger)", fontSize: "0.78rem", padding: "0.35rem 0.5rem" }}>{sendError}</p>
          )}
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Pose ta question au Coach IA..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
            />
            <button className="chat-send" onClick={() => send(input)} disabled={sending}>
              &#8594;
            </button>
          </div>
        </section>

        <aside className="chat-sidebar-panel">
          <article className="panel-card">
            <h2 className="panel-title">Contexte actuel</h2>
            <div className="stack" style={{ gap: "0.45rem" }}>
              <div className="row-sb" style={{ fontSize: "0.75rem" }}>
                <span className="muted">Etape</span>
                <span className="badge badge-accent">{context?.etape ?? "-"}</span>
              </div>
              <div className="row-sb" style={{ fontSize: "0.75rem" }}>
                <span className="muted">Score</span>
                <span style={{ fontWeight: 600 }}>
                  {context ? `${context.score} / ${context.objectif}` : "-"}
                </span>
              </div>
              <div className="row-sb" style={{ fontSize: "0.75rem" }}>
                <span className="muted">Echeance</span>
                <span className="text-danger" style={{ fontWeight: 600 }}>{context?.deadline ?? "-"}</span>
              </div>
              <div className="row-sb" style={{ fontSize: "0.75rem" }}>
                <span className="muted">Zone faible</span>
                <span className="text-warn" style={{ fontWeight: 600 }}>{context?.weakZones ?? "-"}</span>
              </div>
            </div>
          </article>

          <article className="panel-card">
            <h2 className="panel-title">Actions rapides</h2>
            <div className="stack" style={{ gap: "0.35rem" }}>
              {QUICK_ACTIONS.slice(0, 4).map((action) => (
                <button
                  key={action}
                  className="btn-secondary rounded-md px-3 py-2 text-xs text-left"
                  onClick={() => send(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </article>

          <article className="panel-card coach-history-card">
            <div className="row-sb" style={{ gap: "0.65rem", marginBottom: "0.65rem" }}>
              <h2 className="panel-title" style={{ margin: 0 }}>Historique</h2>
              <button type="button" className="btn-secondary rounded-md px-3 py-2 text-xs" onClick={loadHistory}>
                Voir
              </button>
            </div>
            <div className="coach-history-list">
              {recentHistory.length ? (
                recentHistory.map((msg) => (
                  <button
                    key={msg.id}
                    type="button"
                    className="coach-history-item"
                    onClick={loadHistory}
                  >
                    <span>{msg.role === "assistant" ? "Coach IA" : "Moi"}</span>
                    <strong>{msg.content.slice(0, 72)}{msg.content.length > 72 ? "..." : ""}</strong>
                  </button>
                ))
              ) : (
                <p className="card-desc" style={{ margin: 0 }}>Aucun historique disponible.</p>
              )}
            </div>
          </article>
        </aside>
      </div>

      <style>{`
        .coach-page-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }
        .coach-new-chat-btn {
          display: none;
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 999px;
          border: 1px solid color-mix(in oklab, var(--accent) 36%, var(--border) 64%);
          background: color-mix(in oklab, var(--accent-dim) 70%, var(--bg-2) 30%);
          color: var(--accent);
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1;
        }
        .coach-empty-state {
          width: min(34rem, 100%);
          margin: auto;
          border: 1px solid var(--border);
          border-radius: 1.2rem;
          background:
            radial-gradient(300px 180px at 88% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 72%),
            var(--bg-2);
          padding: clamp(1rem, 3vw, 1.35rem);
          text-align: center;
        }
        .coach-empty-kicker {
          color: var(--accent);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }
        .coach-empty-state h2 {
          margin: 0.62rem 0 0;
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(1.35rem, 4vw, 2rem);
          line-height: 1.08;
        }
        .coach-empty-state p {
          margin: 0.65rem auto 0;
          max-width: 38ch;
          color: var(--text-soft);
          font-size: 0.9rem;
          line-height: 1.65;
        }
        .coach-history-list {
          display: grid;
          gap: 0.42rem;
        }
        .coach-history-item {
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          background: color-mix(in oklab, var(--bg-2) 76%, transparent);
          color: var(--text);
          padding: 0.62rem 0.7rem;
          text-align: left;
        }
        .coach-history-item span {
          display: block;
          color: var(--accent);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .coach-history-item strong {
          display: block;
          margin-top: 0.2rem;
          color: var(--text-soft);
          font-size: 0.74rem;
          line-height: 1.35;
          font-weight: 600;
        }
        .msg-bubble-ai {
          background: var(--card-bg, #1a1f2e);
          border: 1px solid var(--border, rgba(255,255,255,0.08));
          max-width: 72%;
        }
        .coach-msg-content {
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--text, #e2e8f0);
        }
        .coach-msg-content h1,
        .coach-msg-content h2,
        .coach-msg-content h3 {
          font-weight: 700;
          margin: 1rem 0 0.4rem;
          color: var(--text-strong, #fff);
          line-height: 1.3;
        }
        .coach-msg-content h1 { font-size: 1.1rem; }
        .coach-msg-content h2 { font-size: 1rem; }
        .coach-msg-content h3 { font-size: 0.93rem; color: var(--accent, #4f9cf9); }
        .coach-msg-content p {
          margin: 0.5rem 0;
        }
        .coach-msg-content ul,
        .coach-msg-content ol {
          margin: 0.5rem 0 0.5rem 1.2rem;
          padding: 0;
        }
        .coach-msg-content li {
          margin: 0.25rem 0;
        }
        .coach-msg-content strong {
          color: var(--text-strong, #fff);
          font-weight: 700;
        }
        .coach-msg-content em {
          color: var(--text-soft, #94a3b8);
          font-style: italic;
        }
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--accent, #4f9cf9);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.7s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-dots {
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 4px 0;
        }
        .typing-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent, #4f9cf9);
          animation: dot-bounce 1.2s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @media (max-width: 700px) {
          .page-header {
            align-items: stretch;
            gap: 0.75rem;
          }

          .coach-page-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.45rem;
          }

          .coach-page-actions > * {
            min-height: 2.75rem;
            padding-inline: 0.7rem;
          }

          .chat-container {
            gap: 0.85rem;
          }

          .chat-main {
            height: auto;
            min-height: calc(100dvh - 12.5rem);
            border-radius: 1rem;
            background: var(--bg-2);
          }

          .chat-header {
            align-items: flex-start;
            padding: 0.85rem;
            gap: 0.7rem;
          }

          .chat-header > div:nth-child(2) {
            min-width: 0;
            flex: 1;
          }

          .chat-header .row {
            display: none;
          }

          .coach-new-chat-btn {
            display: inline-grid;
            place-items: center;
            margin-left: auto;
          }

          .chat-ai-name {
            font-size: 0.82rem;
            line-height: 1.25;
          }

          .chat-ai-status {
            margin-top: 0.18rem;
            font-size: 0.68rem;
            line-height: 1.45;
          }

          .chat-messages {
            padding: 0.85rem;
            gap: 0.8rem;
            min-height: 42dvh;
            max-height: none;
            overflow: visible;
          }

          .msg {
            max-width: 100%;
            width: 100%;
            gap: 0;
          }

          .msg-avatar {
            display: none;
          }

          .msg-bubble,
          .msg-bubble-ai,
          .chat-main .msg-ai .msg-bubble,
          .chat-main .msg-user .msg-bubble {
            max-width: 100%;
            width: 100%;
            border-radius: 1rem;
            padding: 0.9rem;
            font-size: 0.9rem;
          }

          .msg-user .msg-bubble {
            width: auto;
            max-width: 88%;
            margin-left: auto;
            border-radius: 1rem 1rem 0.25rem 1rem;
          }

          .coach-msg-content {
            font-size: 0.92rem;
            line-height: 1.72;
          }

          .coach-msg-content p {
            margin: 0.35rem 0;
          }

          .chat-quick-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.45rem;
            padding: 0.85rem;
            background: color-mix(in oklab, var(--bg-2) 88%, transparent);
          }

          .qa-btn {
            min-height: 2.55rem;
            padding: 0.62rem 0.85rem;
            border-radius: 0.85rem;
            text-align: left;
            font-size: 0.82rem;
            color: var(--text);
            background: color-mix(in oklab, var(--accent-dim) 34%, var(--bg-2) 66%);
          }

          .chat-input-row {
            position: sticky;
            bottom: 0;
            z-index: 4;
            padding: 0.78rem;
            gap: 0.55rem;
            background: var(--bg-2);
            border-top: 1px solid var(--border);
          }

          .chat-input {
            min-width: 0;
            min-height: 3.1rem;
            border-radius: 1rem;
            padding: 0.78rem 0.95rem;
            font-size: 0.9rem;
          }

          .chat-send {
            width: 3.1rem;
            height: 3.1rem;
            flex: 0 0 3.1rem;
            font-size: 1.05rem;
          }

          .chat-sidebar-panel {
            position: static;
          }

          .coach-history-card {
            order: -1;
          }

          .coach-history-list {
            max-height: 13rem;
            overflow-y: auto;
            padding-right: 0.15rem;
          }
        }
      `}</style>
    </div>
  );
}
