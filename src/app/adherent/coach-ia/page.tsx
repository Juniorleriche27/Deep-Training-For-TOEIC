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
  const [context, setContext] = useState<CoachContext | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageSeqRef = useRef(0);

  useEffect(() => {
    Promise.all([api.getChatHistory(), api.getCoachContext()]).then(([history, ctx]) => {
      setMessages(history);
      setContext(ctx);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingId]);

  async function send(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
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
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Coach IA</h1>
        <p className="page-sub">Assistant de programme contextuel, relie a l&apos;etape et aux scores.</p>
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
          </div>

          <div className="chat-messages">
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
        </aside>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
