"use client";
nexport const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import type { ChatMessage, CoachContext } from "@/lib/types";

const QUICK_ACTIONS = [
  "Que dois-je faire aujourd'hui ?",
  "Explique-moi mon etape",
  "Rappelle-moi mes consignes",
  "Motive-moi",
  "Que reviser maintenant ?",
];

export default function AdherentCoachIaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<CoachContext | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([api.getChatHistory(), api.getCoachContext()]).then(([history, ctx]) => {
      setMessages(history);
      setContext(ctx);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
    const userMsg: ChatMessage = {
      id: `tmp-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const reply = await api.sendChatMessage(text.trim());
      setMessages((prev) => [...prev.filter((m) => m.id !== userMsg.id), { ...userMsg, id: `user-${Date.now()}` }, reply]);
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
                  {msg.role === "assistant" ? "IA" : "AS"}
                </div>
                <div className="msg-bubble">{msg.content}</div>
              </div>
            ))}
            {sending && (
              <div className="msg msg-ai">
                <div className="msg-avatar" style={{ background: "linear-gradient(135deg,var(--accent),#0070cc)", color: "#fff" }}>IA</div>
                <div className="msg-bubble muted" style={{ fontStyle: "italic" }}>En train de repondre...</div>
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
              -&gt;
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
    </div>
  );
}
