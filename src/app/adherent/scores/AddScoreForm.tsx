"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const FORMATS = ["PC / 2h", "PC adaptatif / 1h", "Papier / 2h"];

export function AddScoreForm() {
  const router = useRouter();
  const [listening, setListening] = useState("");
  const [reading, setReading] = useState("");
  const [format, setFormat] = useState(FORMATS[0]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const l = parseInt(listening);
    const r = parseInt(reading);
    if (!l || !r || l < 0 || l > 495 || r < 0 || r > 495) {
      setError("Listening et Reading doivent être entre 0 et 495.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.addScore({ listening: l, reading: r, format });
      router.refresh();
      setListening("");
      setReading("");
    } catch {
      setError("Impossible d'enregistrer le score. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="card" style={{ borderColor: "rgba(0,201,255,.3)" }}>
      <h2 className="card-title" style={{ marginBottom: "0.8rem" }}>Ajouter un score</h2>
      <form onSubmit={handleSubmit} className="stack" style={{ gap: "0.75rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)" }}>
            Listening (0–495)
            <input
              className="form-input"
              type="number"
              min={0}
              max={495}
              value={listening}
              onChange={(e) => setListening(e.target.value)}
              placeholder="Ex : 340"
              required
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)" }}>
            Reading (0–495)
            <input
              className="form-input"
              type="number"
              min={0}
              max={495}
              value={reading}
              onChange={(e) => setReading(e.target.value)}
              placeholder="Ex : 380"
              required
            />
          </label>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)" }}>
          Format
          <select
            className="form-input"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            {FORMATS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        {error && <p style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{error}</p>}
        <button
          type="submit"
          className="btn-primary rounded-md px-4 py-2 text-sm font-semibold"
          disabled={saving}
        >
          {saving ? "Enregistrement..." : "Enregistrer le score"}
        </button>
      </form>
    </article>
  );
}
