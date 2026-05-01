import Link from "next/link";
import { programmeSteps } from "@/lib/public-content";

export default function ProgrammePage() {
  return (
    <div className="stack" style={{ gap: "1.15rem" }}>
      <section className="public-page">
        <div className="public-page-hero">
          <div className="public-page-copy reveal-up">
            <p className="public-page-kicker">Programme</p>
            <h1 className="public-page-title">
              Cinq étapes.
              <br />
              Une trajectoire claire.
            </h1>
            <p className="public-page-sub">
              Le programme avance par séquences logiques. Chaque étape prépare la suivante pour
              rendre la montée en score plus lisible, plus stable et plus maîtrisée.
            </p>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">Ce que tu gagnes</h2>
            <ul className="public-spotlight-list">
              <li>Un ordre de travail clair au lieu d&apos;une préparation floue.</li>
              <li>Une progression mesurable sur Listening, Reading et rigueur.</li>
              <li>Une charge d&apos;entraînement alignée sur l&apos;objectif officiel.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-section-head">
          <p className="public-page-kicker">Déploiement</p>
          <h2 className="section-title">Le parcours complet, étape par étape</h2>
        </div>

        <div className="public-two-grid">
          {programmeSteps.map((step) => (
            <article
              key={step.label}
              className="public-panel reveal-up"
              style={{ borderColor: step.color ?? "var(--border)" }}
            >
              <p className="public-page-kicker" style={{ color: step.color ?? "var(--accent)" }}>
                {step.label}
              </p>
              <h3 className="public-panel-title">{step.title}</h3>
              <p className="public-panel-copy">{step.summary}</p>
              <div className="public-chip-row">
                {step.items.map((item) => (
                  <span key={item} className="public-chip">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="public-cta-band reveal-up delay-2">
        <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.9rem" }}>
          <div>
            <p className="public-page-kicker">Accès</p>
            <h2 className="card-title" style={{ marginTop: "0.45rem", fontSize: "1.55rem" }}>
              Le programme est prêt. Reste à cadrer ton entrée.
            </h2>
            <p className="card-desc">Découvre l&apos;offre, les conditions d&apos;accès et la logique d&apos;activation.</p>
          </div>
          <div className="row" style={{ flexWrap: "wrap" }}>
            <Link href="/tarifs" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
              Voir les tarifs
            </Link>
            <Link href="/contact" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold">
              Candidater
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
