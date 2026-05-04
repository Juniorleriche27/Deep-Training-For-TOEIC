"use client";

import { useState } from "react";
import Link from "next/link";

const TOEIC_FORMATS = [
  "Format PC / 2h",
  "Format PC adaptatif / 1h",
  "Format papier / 2h",
  "Je ne sais pas encore",
];

const SOUHAITS = [
  "Entrer dans le programme",
  "Prendre un RDV de cadrage",
  "Configurer la plateforme d'entraînement",
  "Comprendre le parcours avant de décider",
];

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  score_actuel: string;
  score_cible: string;
  date_test: string;
  format_toeic: string;
  souhait: string;
  contexte: string;
}

const EMPTY: FormData = {
  nom: "",
  email: "",
  telephone: "",
  score_actuel: "",
  score_cible: "",
  date_test: "",
  format_toeic: "",
  souhait: "",
  contexte: "",
};

const STEPS = [
  { label: "Identité", icon: "👤" },
  { label: "Objectif", icon: "🎯" },
  { label: "Contexte", icon: "📋" },
  { label: "Confirmation", icon: "✅" },
];

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function next() {
    setError("");
    if (step === 0) {
      if (!form.nom.trim() || !form.email.trim()) {
        setError("Prénom/nom et email sont requis.");
        return;
      }
    }
    if (step === 1) {
      if (!form.score_cible) {
        setError("Le score cible est requis.");
        return;
      }
    }
    setStep((s) => s + 1);
  }

  async function submit() {
    setError("");
    if (!form.souhait) {
      setError("Merci d'indiquer votre souhait principal.");
      return;
    }
    setSubmitting(true);
    // Simulate submit (replace with real API call when backend is ready)
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    setStep(3);
  }

  if (submitted) {
    return (
      <div className="tunnel-shell">
        <div className="tunnel-card tunnel-success">
          <div className="tunnel-success-icon">🎉</div>
          <h2 className="tunnel-success-title">Candidature reçue !</h2>
          <p className="tunnel-success-sub">
            Merci <strong>{form.nom}</strong>. Nous avons bien reçu votre candidature et
            reviendrons vers vous sous 24h à l&apos;adresse <strong>{form.email}</strong>.
          </p>
          <Link href="/" className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold" style={{ display: "inline-block", marginTop: "1.5rem" }}>
            Retour à l&apos;accueil
          </Link>
        </div>
        <style>{tunnelCss}</style>
      </div>
    );
  }

  return (
    <div className="tunnel-shell">
      {/* Progress bar */}
      <div className="tunnel-progress">
        {STEPS.slice(0, 3).map((s, i) => (
          <div key={s.label} className={`tunnel-step ${i <= step ? "tunnel-step-active" : ""} ${i < step ? "tunnel-step-done" : ""}`}>
            <div className="tunnel-step-dot">
              {i < step ? "✓" : i + 1}
            </div>
            <span className="tunnel-step-label">{s.label}</span>
            {i < 2 && <div className={`tunnel-step-line ${i < step ? "tunnel-step-line-done" : ""}`} />}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="tunnel-card">
        {/* Step 0 — Identité */}
        {step === 0 && (
          <div className="tunnel-step-body">
            <p className="tunnel-kicker">Étape 1 sur 3</p>
            <h2 className="tunnel-title">Qui êtes-vous ?</h2>
            <p className="tunnel-sub">Ces informations permettent de personnaliser votre accompagnement.</p>
            <div className="tunnel-fields">
              <label className="tunnel-label">
                Prénom et nom *
                <input className="tunnel-input" value={form.nom} onChange={set("nom")} placeholder="Ex : Sophie Martin" autoFocus />
              </label>
              <label className="tunnel-label">
                Email *
                <input className="tunnel-input" type="email" value={form.email} onChange={set("email")} placeholder="votre@email.com" />
              </label>
              <label className="tunnel-label">
                Téléphone
                <input className="tunnel-input" type="tel" value={form.telephone} onChange={set("telephone")} placeholder="+33 6 12 34 56 78" />
              </label>
            </div>
          </div>
        )}

        {/* Step 1 — Objectif */}
        {step === 1 && (
          <div className="tunnel-step-body">
            <p className="tunnel-kicker">Étape 2 sur 3</p>
            <h2 className="tunnel-title">Votre objectif TOEIC</h2>
            <p className="tunnel-sub">Votre niveau et votre cible permettent de calibrer le programme.</p>
            <div className="tunnel-fields">
              <div className="tunnel-row-2">
                <label className="tunnel-label">
                  Score actuel (estimation)
                  <input className="tunnel-input" type="number" min={0} max={990} value={form.score_actuel} onChange={set("score_actuel")} placeholder="Ex : 520" />
                </label>
                <label className="tunnel-label">
                  Score cible *
                  <input className="tunnel-input" type="number" min={0} max={990} value={form.score_cible} onChange={set("score_cible")} placeholder="Ex : 785" />
                </label>
              </div>
              <label className="tunnel-label">
                Date prévue du test
                <input className="tunnel-input" type="date" value={form.date_test} onChange={set("date_test")} />
              </label>
              <label className="tunnel-label">
                Format TOEIC visé
                <select className="tunnel-input tunnel-select" value={form.format_toeic} onChange={set("format_toeic")}>
                  <option value="">Sélectionner…</option>
                  {TOEIC_FORMATS.map((f) => <option key={f}>{f}</option>)}
                </select>
              </label>
            </div>
          </div>
        )}

        {/* Step 2 — Contexte */}
        {step === 2 && (
          <div className="tunnel-step-body">
            <p className="tunnel-kicker">Étape 3 sur 3</p>
            <h2 className="tunnel-title">Votre contexte</h2>
            <p className="tunnel-sub">Plus c&apos;est précis, plus le retour sera utile.</p>
            <div className="tunnel-fields">
              <label className="tunnel-label">
                Souhait principal *
                <select className="tunnel-input tunnel-select" value={form.souhait} onChange={set("souhait")}>
                  <option value="">Sélectionner…</option>
                  {SOUHAITS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="tunnel-label">
                Contexte et contraintes
                <textarea
                  className="tunnel-input tunnel-textarea"
                  value={form.contexte}
                  onChange={set("contexte")}
                  placeholder="Date limite, historique de scores, disponibilité hebdomadaire, ressources déjà testées…"
                  rows={4}
                />
              </label>
            </div>
          </div>
        )}

        {/* Error */}
        {error && <p className="tunnel-error">{error}</p>}

        {/* Navigation */}
        <div className="tunnel-nav">
          {step > 0 && (
            <button className="tunnel-btn-back" onClick={() => { setStep((s) => s - 1); setError(""); }}>
              ← Retour
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 2 && (
            <button className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold" onClick={next}>
              Continuer →
            </button>
          )}
          {step === 2 && (
            <button
              className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold"
              onClick={submit}
              disabled={submitting}
            >
              {submitting ? "Envoi…" : "Envoyer ma candidature →"}
            </button>
          )}
        </div>
      </div>

      <style>{tunnelCss}</style>
    </div>
  );
}

const tunnelCss = `
  .tunnel-shell {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem 1rem 4rem;
  }

  .tunnel-progress {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 2.2rem;
    width: 100%;
    max-width: 480px;
    justify-content: center;
  }

  .tunnel-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
  }

  .tunnel-step-dot {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(255,255,255,0.07);
    border: 2px solid rgba(255,255,255,0.12);
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    position: relative;
    z-index: 1;
  }
  .tunnel-step-active .tunnel-step-dot {
    background: #1a8fff;
    border-color: #1a8fff;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(26,143,255,0.2);
  }
  .tunnel-step-done .tunnel-step-dot {
    background: #22c55e;
    border-color: #22c55e;
    color: #fff;
  }

  .tunnel-step-label {
    font-size: 0.65rem;
    margin-top: 0.35rem;
    color: #475569;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: center;
  }
  .tunnel-step-active .tunnel-step-label { color: #e2e8f0; }
  .tunnel-step-done .tunnel-step-label { color: #22c55e; }

  .tunnel-step-line {
    position: absolute;
    top: 1rem;
    left: calc(50% + 1rem);
    right: calc(-50% + 1rem);
    height: 2px;
    background: rgba(255,255,255,0.08);
  }
  .tunnel-step-line-done { background: #22c55e; }

  .tunnel-card {
    background: #0f1624;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 1.2rem;
    padding: 2rem 2.2rem;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
    animation: tunnel-fadein 0.25s ease;
  }
  @keyframes tunnel-fadein {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .tunnel-step-body { animation: tunnel-fadein 0.22s ease; }

  .tunnel-kicker {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #1a8fff;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }

  .tunnel-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #f1f5f9;
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }

  .tunnel-sub {
    font-size: 0.82rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .tunnel-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tunnel-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  .tunnel-label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.02em;
  }

  .tunnel-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.6rem;
    color: #e2e8f0 !important;
    font-size: 0.875rem;
    padding: 0.65rem 0.9rem;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
    box-sizing: border-box;
  }
  .tunnel-input:focus {
    border-color: #1a8fff;
    box-shadow: 0 0 0 3px rgba(26,143,255,0.15);
  }
  .tunnel-input::placeholder { color: #334155; }

  .tunnel-select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.8rem center;
    padding-right: 2.2rem;
  }
  .tunnel-select option {
    background: #0f1624;
    color: #e2e8f0;
  }

  .tunnel-textarea {
    resize: vertical;
    min-height: 90px;
  }

  .tunnel-error {
    margin-top: 1rem;
    padding: 0.65rem 0.9rem;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 0.6rem;
    color: #f87171;
    font-size: 0.8rem;
  }

  .tunnel-nav {
    display: flex;
    align-items: center;
    margin-top: 1.8rem;
    gap: 0.75rem;
  }

  .tunnel-btn-back {
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.6rem;
    color: #64748b;
    font-size: 0.82rem;
    padding: 0.6rem 1rem;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .tunnel-btn-back:hover { border-color: #1a8fff; color: #e2e8f0; }

  .tunnel-success {
    text-align: center;
    padding: 3rem 2rem;
  }
  .tunnel-success-icon { font-size: 3rem; margin-bottom: 1rem; }
  .tunnel-success-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #f1f5f9;
    margin-bottom: 0.6rem;
  }
  .tunnel-success-sub {
    font-size: 0.88rem;
    color: #94a3b8;
    line-height: 1.6;
    max-width: 360px;
    margin: 0 auto;
  }

  @media (max-width: 540px) {
    .tunnel-card { padding: 1.4rem 1.1rem; }
    .tunnel-row-2 { grid-template-columns: 1fr; }
  }
`;
