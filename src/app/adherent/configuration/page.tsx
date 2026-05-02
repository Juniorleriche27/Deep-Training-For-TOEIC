const configCards = [
  {
    title: "Format TOEIC",
    desc: "Choisir le bon format: PC / 2h, PC / 1h adaptatif, papier / 2h ou indecis.",
    tone: "var(--accent)",
  },
  {
    title: "Plateforme externe",
    desc: "Connecter l'espace d'entrainement externe et verifier les identifiants.",
    tone: "var(--gold)",
  },
  {
    title: "Coach IA",
    desc: "Charger l'etape active, les consignes et la logique de relance.",
    tone: "var(--success)",
  },
  {
    title: "Tableau de bord",
    desc: "Renseigner score, objectif, echeance et contraintes initiales.",
    tone: "var(--danger)",
  },
];

export default function AdherentConfigurationPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configuration de l&apos;espace</h1>
        <p className="page-sub">
          Reglages initiaux du parcours, du format TOEIC et de la plateforme d&apos;entrainement.
        </p>
      </div>

      <div className="widgets-4">
        {configCards.map((card) => (
          <article key={card.title} className="widget">
            <p className="widget-label">Bloc de configuration</p>
            <p className="widget-value" style={{ color: card.tone, fontSize: "1.05rem", paddingTop: "0.35rem" }}>
              {card.title}
            </p>
            <p className="widget-trend">{card.desc}</p>
          </article>
        ))}
      </div>

      <div className="grid-main">
        <article className="card">
          <div className="row-sb" style={{ marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <h2 className="card-title">Checklist de configuration</h2>
            <span className="badge badge-accent">Avant demarrage</span>
          </div>
          <div className="stack" style={{ gap: "0.7rem" }}>
            {[
              "Valider le format TOEIC cible.",
              "Configurer la plateforme externe d'entrainement.",
              "Renseigner le score actuel et l'objectif.",
              "Definir la date du test et les contraintes reelles.",
              "Verifier que le Coach IA pointe sur la bonne etape.",
            ].map((item) => (
              <div key={item} className="alert-row info">
                <div className="alert-row-icon">+</div>
                <div>
                  <div className="alert-row-title">{item}</div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card" style={{ borderColor: "rgba(245,166,35,.28)" }}>
          <div className="row-sb" style={{ marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <h2 className="card-title">Formats a proposer</h2>
            <span className="badge badge-gold">Cadrage</span>
          </div>
          <div className="stack" style={{ gap: "0.55rem" }}>
            {[
              "Format : PC / 2h",
              "Format PC : PC / 1h adaptatif",
              "Format papier : 2h",
              "Je ne sais pas",
            ].map((item) => (
              <div key={item} className="unlock-tag" style={{ width: "100%", padding: "0.55rem 0.7rem" }}>
                {item}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
