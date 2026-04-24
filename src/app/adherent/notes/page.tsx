"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Note } from "@/lib/types";

export default function AdherentNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    api.getNotes()
      .then((data) => {
        setNotes(data);
        if (data.length > 0) selectNote(data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  function selectNote(note: Note) {
    setSelected(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  async function handleSave() {
    if (!selected || saving) return;
    setSaving(true);
    try {
      const updated = await api.updateNote(selected.id, {
        title: editTitle,
        content: editContent,
      });
      setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      setSelected(updated);
    } finally {
      setSaving(false);
    }
  }

  async function handleNew() {
    const note = await api.createNote({
      title: "Nouvelle note",
      etape: "",
      content: "",
      words: [],
    });
    setNotes((prev) => [note, ...prev]);
    selectNote(note);
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Prise de notes</h1>
        <p className="page-sub">Notes, mots a reviser et erreurs a corriger.</p>
      </div>

      <div className="notes-layout">
        <aside className="notes-list">
          <div className="notes-list-header">
            <span>Mes notes ({notes.length})</span>
            <button className="btn-secondary rounded-md px-2 py-1 text-xs" onClick={handleNew}>
              + Nouvelle
            </button>
          </div>
          {loading && <p className="muted text-xs" style={{ padding: "0.75rem" }}>Chargement...</p>}
          {notes.map((note) => (
            <article
              key={note.id}
              className={`note-item ${selected?.id === note.id ? "active" : ""}`}
              onClick={() => selectNote(note)}
            >
              <h2 className="note-item-title">{note.title}</h2>
              <p className="note-item-meta">{note.meta}</p>
            </article>
          ))}
        </aside>

        {selected ? (
          <article className="note-editor">
            <div className="note-editor-toolbar">
              <span className="badge badge-accent">{selected.etape || "Sans etape"}</span>
              <button className="tool-btn">Gras</button>
              <button className="tool-btn">Italique</button>
              <button className="tool-btn">Liste</button>
              <div className="row" style={{ marginLeft: "auto" }}>
                {selected.tag && <span className="badge badge-gold">{selected.tag}</span>}
                <button className="tool-btn">Tag</button>
                <button
                  className="btn-primary rounded-md px-3 py-1 text-xs"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>

            <div className="note-editor-body">
              <input
                className="note-editor-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="form-textarea"
                style={{ marginTop: "0.75rem", minHeight: "120px" }}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Contenu de la note..."
              />
              {selected.words.length > 0 && (
                <div className="note-word-tags" style={{ marginTop: "0.75rem" }}>
                  {selected.words.map((w) => (
                    <span key={w.word} className={`word-tag ${w.state}`}>
                      {w.word}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ) : (
          !loading && (
            <article className="note-editor" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p className="muted text-sm">Selectionne une note ou cree-en une nouvelle.</p>
            </article>
          )
        )}
      </div>
    </div>
  );
}
