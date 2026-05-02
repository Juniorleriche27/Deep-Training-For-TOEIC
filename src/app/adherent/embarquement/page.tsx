const setupSteps = [
  ["1", "Video de configuration", "Suivre la procedure de connexion a la plateforme externe d&apos;entrainement."],
  ["2", "Verification des acces", "Confirmer le dashboard, les ressources et le bon format TOEIC."],
  ["3", "Lancement du programme", "Comprendre les 5 etapes et la logique d'execution du parcours."],
];

const programmeBlocks = [
  ["Embarquement", "Cadre, outils, consignes et configuration initiale."],
  ["Execution", "Travail quotidien, score tracking et regularite."],
  ["Coach IA", "Relances, clarifications et cadrage de l'etape active."],
];

export default function AdherentEmbarquementPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Espace d&apos;embarquement</h1>
        <p className="page-sub">
          Procedure de configuration, presentation du programme complet et verification des acces.
        </p>
      </div>

      <div className="grid-main">
        <div className="stack">
          <article className="card" style={{ borderColor: "rgba(0,201,255,.32)" }}>
            <div className="row-sb" style={{ marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.6rem" }}>
              <h2 className="card-title">Video de procedure</h2>
              <span className="badge badge-accent">Configuration externe</span>
            </div>
            <div
              className="card-surface"
              style={{
                minHeight: "240px",
                padding: "1rem",
                display: "grid",
                placeItems: "center",
                borderStyle: "dashed",
              }}
            >
              <div className="stack" style={{ gap: "0.45rem", textAlign: "center", maxWidth: "28rem" }}>
                <div className="widget-value text-accent" style={{ fontSize: "1.6rem" }}>VIDEO</div>
                <p className="card-desc">
                  Zone prevue pour la video de configuration de la plateforme externe d&apos;entrainement.
                </p>
                <button className="btn-secondary rounded-md px-4 py-2 text-sm font-semibold">
                  Integrer la video
                </button>
              </div>
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.9rem" }}>Deroule d&apos;embarquement</h2>
            <div className="steps-timeline">
              {setupSteps.map(([num, title, desc], index) => (
                <div key={title} className="step-row">
                  <div className="step-line">
                    <span className="step-dot">{num}</span>
                    {index < setupSteps.length - 1 ? <span className="step-connector" /> : null}
                  </div>
                  <div className="step-body">
                    <h3 className="card-title text-sm">{title}</h3>
                    <p className="card-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="stack">
          <article className="card">
            <div className="row-sb" style={{ marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.6rem" }}>
              <h2 className="card-title">Programme complet</h2>
              <span className="badge badge-success">Vue d&apos;ensemble</span>
            </div>
            <div className="stack" style={{ gap: "0.7rem" }}>
              {programmeBlocks.map(([title, desc], index) => (
                <div key={title} className="unlock-card" style={{ padding: "0.85rem" }}>
                  <div className="unlock-num">{index + 1}</div>
                  <div>
                    <div className="step-name">{title}</div>
                    <div className="step-what">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card" style={{ borderColor: "rgba(245,166,35,.28)" }}>
            <h2 className="card-title" style={{ marginBottom: "0.7rem" }}>Acces a verifier</h2>
            <div className="stack" style={{ gap: "0.55rem" }}>
              {[
                "Plateforme externe d&apos;entrainement",
                "Dashboard adherent",
                "Programme et ressources",
                "Coach IA et consignes initiales",
              ].map((item) => (
                <div key={item} className="row" style={{ alignItems: "flex-start" }}>
                  <span className="badge badge-gold">OK</span>
                  <span className="card-desc">{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
