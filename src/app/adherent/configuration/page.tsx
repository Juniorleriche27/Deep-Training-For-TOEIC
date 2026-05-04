"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { api } from "@/lib/api";

const STATUTS = [
  { label: "Étudiant(e)", value: "student" },
  { label: "Professionnel(le)", value: "professional" },
  { label: "Autre", value: "other" },
];
const NIVEAUX_ETUDE = ["Bac", "Bac+2", "Bac+3", "Bac+4", "Bac+5 et plus", "Autre"];
const MOTIVATIONS = [
  "Visa / immigration",
  "Poste / promotion professionnelle",
  "Admission en école ou université",
  "Certification personnelle",
  "Autre",
];

export default function AdherentConfigurationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    score_objectif: "",
    score_actuel: "",
    date_toeic: "",
    statut: "",
    niveau_etude: "",
    profession: "",
    motivation: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.first_name.trim() || !form.last_name.trim()) {
      setError("Prénom et nom sont obligatoires.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();

      // 1. Mettre à jour user_metadata Supabase (pour le header)
      const { error: metaErr } = await supabase.auth.updateUser({
        data: {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
        },
      });
      if (metaErr) throw new Error(metaErr.message);

      // 2. Rafraîchir la session pour que le middleware voie la metadata à jour
      await supabase.auth.refreshSession();

      // 3. Envoyer au backend (source officielle du dashboard)
      await api.initProfil({
        firstName: form.first_name.trim(),
        lastName: form.last_name.trim(),
        currentScore: Number(form.score_actuel) || 0,
        targetScore: Number(form.score_objectif) || 785,
        toeicDate: form.date_toeic || "",
        status: form.statut || "other",
        studyLevel: form.niveau_etude || "",
        profession: form.profession.trim(),
        mainMotivation: form.motivation || "",
      });

      router.push("/adherent/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configuration du profil</h1>
        <p className="page-sub">
          Complète ton profil pour personnaliser ton parcours TOEIC.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h2 className="card-title" style={{ marginBottom: "1.2rem" }}>
            Identité
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
                Prénom *
              </span>
              <input
                className="input"
                value={form.first_name}
                onChange={set("first_name")}
                placeholder="Ton prénom"
                required
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
                Nom *
              </span>
              <input
                className="input"
                value={form.last_name}
                onChange={set("last_name")}
                placeholder="Ton nom"
                required
              />
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
                Statut
              </span>
              <select className="input" value={form.statut} onChange={set("statut")}>
                <option value="">Choisir…</option>
                {STATUTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
                Niveau d&apos;étude
              </span>
              <select className="input" value={form.niveau_etude} onChange={set("niveau_etude")}>
                <option value="">Choisir…</option>
                {NIVEAUX_ETUDE.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
              Profession / domaine
            </span>
            <input
              className="input"
              value={form.profession}
              onChange={set("profession")}
              placeholder="Ex : Ingénieur, Étudiant en médecine…"
            />
          </label>
        </div>

        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h2 className="card-title" style={{ marginBottom: "1.2rem" }}>
            Objectif TOEIC
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
                Score actuel (estimation)
              </span>
              <input
                className="input"
                type="number"
                min={0}
                max={990}
                value={form.score_actuel}
                onChange={set("score_actuel")}
                placeholder="Ex : 450"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
                Score objectif
              </span>
              <input
                className="input"
                type="number"
                min={0}
                max={990}
                value={form.score_objectif}
                onChange={set("score_objectif")}
                placeholder="Ex : 785"
              />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
              Date prévue de passage TOEIC
            </span>
            <input
              className="input"
              type="date"
              value={form.date_toeic}
              onChange={set("date_toeic")}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-soft)", fontWeight: 600 }}>
              Motivation principale
            </span>
            <select className="input" value={form.motivation} onChange={set("motivation")}>
              <option value="">Choisir…</option>
              {MOTIVATIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <p
            style={{
              color: "var(--danger)",
              fontSize: "0.85rem",
              marginBottom: "1rem",
              padding: "0.75rem 1rem",
              background: "var(--danger-subtle)",
              borderRadius: "0.75rem",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{ width: "100%", padding: "0.9rem" }}
        >
          {loading ? "Enregistrement…" : "Valider et accéder à mon espace →"}
        </button>
      </form>
    </div>
  );
}
