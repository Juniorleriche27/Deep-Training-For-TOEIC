import Link from "next/link";

const included = [
  "Programme en 5 etapes debloque progressivement",
  "Coach IA integre a l'etape et au score",
  "Ressources premium (notes, grammaire, astuces, dashboard)",
  "Suivi des scores et retests",
  "Accompagnement humain strategique",
  "Communaute Discord VIP",
  "Acces 3 mois renouvelable",
];

const accessFlow = [
  ["1", "Candidature", "Profil, score actuel, score cible, date du test."],
  ["2", "Validation", "Qualification du besoin et cadrage du programme."],
  ["3", "Activation", "Acces plateforme + demarrage de l'etape 1 sous 24h."],
];

export default function TarifsPage() {
  return (
    <div>
      <section className="section-shell surface-container">
        <div className="section-header reveal-up">
          <div className="section-tag">Acces</div>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2.15rem, 5vw, 3.1rem)" }}
          >
            Une offre claire.
            <br />
            Un systeme complet.
          </h1>
          <p className="section-sub">
            Pas de formule confuse. Un acces unique pour executer le programme
            complet Deep Training For TOEIC.
          </p>
        </div>

        <div className="pricing-grid">
          <article className="pricing-card featured reveal-up delay-1">
            <span className="badge badge-accent">Acces complet premium</span>
            <h2 className="price-tag">
              Deep Training For TOEIC
              <br />
              <span className="text-[var(--accent)]">Systeme 3 mois</span>
            </h2>
            <p className="muted text-sm">
              Accompagnement structure, progression guidee, execution pilotee.
            </p>
            <ul className="price-features">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary inline-flex w-full justify-center rounded-md px-4 py-3 text-sm font-semibold">
              Soumettre ma candidature
            </Link>
            <p className="muted mt-3 text-center text-xs">
              Candidature gratuite. Reponse sous 24h.
            </p>
          </article>

          <div className="stack">
            <article className="card reveal-up delay-2">
              <h3 className="card-title">Parcours d'acces</h3>
              <div className="steps-timeline mt-5">
                {accessFlow.map(([num, title, desc], index) => (
                  <div key={title} className="step-row">
                    <div className="step-line">
                      <span className="step-dot" style={{ width: "1.7rem", height: "1.7rem", fontSize: "0.72rem" }}>
                        {num}
                      </span>
                      {index < accessFlow.length - 1 ? <span className="step-connector" /> : null}
                    </div>
                    <div className="step-body pb-4">
                      <h4 className="card-title text-sm">{title}</h4>
                      <p className="card-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="card reveal-up delay-3">
              <h3 className="card-title">Pour qui ce systeme?</h3>
              <div className="stack" style={{ marginTop: "0.7rem", gap: "0.45rem" }}>
                <p className="card-desc">Tu veux valider ton score sans dispersion.</p>
                <p className="card-desc">Tu veux un cadre strict avec guidance claire.</p>
                <p className="card-desc">Tu veux un accompagnement credible et mesurable.</p>
              </div>
              <div className="row" style={{ marginTop: "0.9rem" }}>
                <Link href="/methode" className="btn-secondary rounded-md px-3 py-2 text-xs font-semibold">
                  Voir la methode
                </Link>
                <Link href="/programme" className="btn-secondary rounded-md px-3 py-2 text-xs font-semibold">
                  Voir le programme
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
