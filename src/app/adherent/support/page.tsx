"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Message } from "@/lib/types";

export default function AdherentSupportPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendError, setSendError] = useState("");
  const [readingId, setReadingId] = useState<string | null>(null);

  useEffect(() => {
    api.getMessages()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  async function handleSend() {
    if (!input.trim() || sending) return;
    setSending(true);
    setSendError("");
    try {
      const msg = await api.sendMessage(input.trim());
      setMessages((prev) => [msg, ...prev]);
      setInput("");
    } catch {
      setSendError("Impossible d'envoyer le message. Réessayez.");
    } finally {
      setSending(false);
    }
  }

  async function handleMarkRead(id: string) {
    if (readingId) return;
    setReadingId(id);
    setSendError("");
    try {
      const updated = await api.markMessageRead(id);
      setMessages((prev) => prev.map((message) => (message.id === id ? updated : message)));
    } catch {
      setSendError("Impossible de marquer le message comme lu. Réessayez.");
    } finally {
      setReadingId(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Messages & Support</h1>
        <p className="page-sub">Echanges de support et difficultes rencontrees.</p>
      </div>

      <div style={{ maxWidth: "780px" }} className="stack">
        {loading && <p className="muted text-sm">Chargement des messages...</p>}

        {messages.map((message) => (
          <article
            key={message.id}
            className="card"
            style={{ borderLeft: `2px solid ${message.borderColor}` }}
          >
            <div className="row-sb" style={{ marginBottom: "0.45rem" }}>
              <div className="row">
                <div
                  className="user-avatar"
                  style={{
                    background: "var(--gold-dim)",
                    color: "var(--gold)",
                    borderColor: "rgba(245,166,35,.3)",
                  }}
                >
                  {message.senderAvatar}
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{message.sender}</div>
                  <div className="muted text-xs">{message.time}</div>
                </div>
              </div>
              <span className={`badge ${message.read ? "" : "badge-accent"}`}>
                {message.read ? "Lu" : "Non lu"}
              </span>
            </div>
            <p className="card-desc">{message.content}</p>
            {!message.read && (
              <button
                className="btn-secondary mt-3 rounded-md px-3 py-2 text-xs font-semibold"
                onClick={() => handleMarkRead(message.id)}
                disabled={readingId === message.id}
              >
                {readingId === message.id ? "Mise à jour..." : "Marquer comme lu"}
              </button>
            )}
          </article>
        ))}

        <article className="card" style={{ borderColor: "rgba(0,201,255,.3)" }}>
          <h2 className="card-title" style={{ marginBottom: "0.65rem" }}>Envoyer un message</h2>
          <textarea
            className="form-textarea"
            placeholder="Question, difficulte ou dernier score..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {sendError && (
            <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{sendError}</p>
          )}
          <button
            className="btn-primary mt-3 rounded-md px-4 py-2 text-sm font-semibold"
            onClick={handleSend}
            disabled={sending || !input.trim()}
          >
            {sending ? "Envoi..." : "Envoyer ->"}
          </button>
        </article>
      </div>
    </div>
  );
}
