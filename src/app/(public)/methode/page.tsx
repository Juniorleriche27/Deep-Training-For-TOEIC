import Link from "next/link";

const classicApproach = [
  "Tests blancs en boucle sans analyse de cause racine",
  "Focus volume au lieu de focus execution",
  "Grammaire memorisee hors contexte de decision",
  "Prise de notes absente ou non exploitable",
  "Aucun pilotage clair de progression",
];

const deepApproach = [
  "Programme en 5 etapes avec criteres de passage",
  "Consignes strictes de mise en oeuvre",
  "Prise de notes operationnelle et relue",
  "Suivi de score + retests pour correction rapide",
  "Coach IA contextuel et coaching humain strategique",
];

const pillars = [
  {
    title: "Architecture du programme",
    body: "Tu executes un systeme sequence, pas une pile de contenus.",
    code: "P1",
  },
  {
    title: "Consignes d'execution",
    body: "Chaque session precise quoi faire, comment faire et quoi mesurer.",
    code: "P2",
  },
  {
    title: "Discipline quotidienne",
    body: "Routines, chrono, notes, retours: la progression devient reproductible.",
    code: "P3",
  },
  {
    title: "Pilotage par donnees",
    body: "Scores, deltas, zones faibles: decisions prises sur faits, pas impressions.",
    code: "P4",
  },
  {
    title: "Coach IA contextuel",
    body: "Un assistant integre a ton etape, ton historique et ton objectif score.",
    code: "P5",
  },
  {
    title: "Accompagnement humain",
    body: "Arbitrages critiques, relances et ajustements au bon moment.",
    code: "P6",
  },
];

export default function MethodePage() {
  return (
    <div>
      <section className="section-shell surface-container">
        <div className="section-header reveal-up">
          <div className="section-tag">Methode</div>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2.15rem, 5vw, 3.1rem)" }}
          >
            Ce n&apos;est pas un cours.
            <br />
            C&apos;est un systeme d&apos;execution.
          </h1>
          <p className="section-sub">
            Deep Training For TOEIC transforme la preparation en protocole de
            performance: cadence, consignes, notes, retests et pilotage precis.
          </p>
        </div>

        <div className="cards-2">
          <article className="card reveal-up delay-1" style={{ borderLeft: "2px solid var(--danger)" }}>
            <p className="section-tag" style={{ color: "var(--danger)" }}>
              Approche qui stagne
            </p>
            <div className="stack" style={{ marginTop: "0.8rem", gap: "0.45rem" }}>
              {classicApproach.map((item) => (
                <p
                  key={item}
                  className="card-desc"
                  style={{
                    marginTop: 0,
                    border: "1px solid rgba(255,102,134,.25)",
                    background: "var(--danger-dim)",
                    borderRadius: "0.6rem",
                    padding: "0.6rem 0.75rem",
                    color: "var(--text)",
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article className="card reveal-up delay-2" style={{ borderLeft: "2px solid var(--success)" }}>
            <p className="section-tag" style={{ color: "var(--success)" }}>
              Approche Deep Training For TOEIC
            </p>
            <div className="stack" style={{ marginTop: "0.8rem", gap: "0.45rem" }}>
              {deepApproach.map((item) => (
                <p
                  key={item}
                  className="card-desc"
                  style={{
                    marginTop: 0,
                    border: "1px solid rgba(41,211,159,.3)",
                    background: "var(--success-dim)",
                    borderRadius: "0.6rem",
                    padding: "0.6rem 0.75rem",
                    color: "var(--text)",
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell surface-container">
        <div className="section-header reveal-up">
          <div className="section-tag">Piliers</div>
          <h2 className="section-title">Les mecanismes qui creent le score</h2>
        </div>
        <div className="cards-3">
          {pillars.map((item, index) => (
            <article key={item.title} className={`card reveal-up delay-${(index % 3) + 1}`}>
              <div className="card-icon icon-accent">{item.code}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell surface-container">
        <article className="card reveal-up">
          <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
            <div>
              <p className="section-tag">Execution</p>
              <h2 className="card-title" style={{ fontSize: "1.5rem", marginTop: "0.4rem" }}>
                Tu veux sortir du hasard?
              </h2>
              <p className="card-desc">Entre dans un cadre structure et mesurable.</p>
            </div>
            <div className="row">
              <Link href="/programme" className="btn-secondary rounded-md px-4 py-2 text-xs font-semibold">
                Voir le programme
              </Link>
              <Link href="/contact" className="btn-primary rounded-md px-4 py-2 text-xs font-semibold">
                Soumettre ma candidature
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
