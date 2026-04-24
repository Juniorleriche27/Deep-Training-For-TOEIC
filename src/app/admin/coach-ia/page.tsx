const globalRules = [
  {
    title: "Identite et ton",
    body:
      "Le Coach IA agit comme assistant de programme, ton direct et actionnable. Pas de reponse vague.",
    tags: ["Global", "Toutes etapes"],
  },
  {
    title: "Rappels de consignes",
    body:
      "Rappeler les consignes speciales de l'etape en cours et ne jamais contredire les regles coach humain.",
    tags: ["Global"],
  },
  {
    title: "Limites d'intervention",
    body:
      "Le Coach IA ne modifie pas le programme. Toute demande de changement doit etre redirigee vers support humain.",
    tags: ["Critique"],
  },
];

const stageRules = [
  {
    title: "Regle Etape 3 - Priorite Part 7",
    body:
      "Si difficulte Part 7: questions avant texte, scan mots-cles, 8 minutes max pour double passage.",
  },
  {
    title: "Regle Etape 3 - Chronometrage",
    body:
      "Si l'adherent ne mentionne pas le temps, demander explicitement s'il a chronometre la session.",
  },
];

export default function AdminCoachIaPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Pilotage Coach IA</h1>
        <p className="page-sub">Regles globales et orchestration des consignes par etape.</p>
      </div>

      <div className="grid-main">
        <div className="stack">
          <article className="card">
            <div className="row-sb" style={{ marginBottom: "0.75rem" }}>
              <h2 className="card-title">Consignes globales</h2>
              <button className="btn-secondary rounded-md px-3 py-1 text-xs">Modifier</button>
            </div>
            <div className="stack" style={{ gap: "0.55rem" }}>
              {globalRules.map((rule) => (
                <article key={rule.title} className="rule-card">
                  <div className="rule-header">
                    <h3 className="rule-title">{rule.title}</h3>
                    <span className="badge badge-success">Actif</span>
                  </div>
                  <div className="rule-body">{rule.body}</div>
                  <div className="rule-meta">
                    {rule.tags.map((tag) => (
                      <span key={tag} className={`badge ${tag === "Critique" ? "badge-danger" : "badge"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="card">
            <div className="row-sb" style={{ marginBottom: "0.75rem" }}>
              <h2 className="card-title">Regles par etape</h2>
              <button className="btn-secondary rounded-md px-3 py-1 text-xs">+ Ajouter une regle</button>
            </div>
            <div className="filter-bar" style={{ marginBottom: "0.6rem" }}>
              {["Etape 1", "Etape 2", "Etape 3", "Etape 4", "Etape 5"].map((step, index) => (
                <button key={step} className={`filter-btn ${index === 2 ? "active" : ""}`}>
                  {step}
                </button>
              ))}
            </div>
            <div className="stack" style={{ gap: "0.55rem" }}>
              {stageRules.map((rule) => (
                <article key={rule.title} className="rule-card">
                  <div className="rule-header">
                    <h3 className="rule-title">{rule.title}</h3>
                    <span className="badge badge-accent">Etape 3</span>
                  </div>
                  <div className="rule-body">{rule.body}</div>
                  <div className="rule-meta">
                    <span className="badge badge-accent">Etape 3</span>
                    <span className="badge badge-gold">Prioritaire</span>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>

        <div className="stack">
          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.65rem" }}>
              Messages de motivation
            </h2>
            <div className="stack" style={{ gap: "0.45rem" }}>
              <div className="rule-body" style={{ borderLeft: "2px solid var(--success)" }}>
                Chaque session compte. Continue d&apos;executer le plan.
              </div>
              <div className="rule-body" style={{ borderLeft: "2px solid var(--accent)" }}>
                La regularite reste ton avantage competitif.
              </div>
              <div className="rule-body" style={{ borderLeft: "2px solid var(--gold)" }}>
                Le score monte parce que l&apos;execution est stable.
              </div>
              <button className="btn-secondary rounded-md px-3 py-2 text-xs">+ Ajouter un message</button>
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.65rem" }}>
              Statistiques Coach IA
            </h2>
            <div className="stack" style={{ gap: "0.4rem" }}>
              <div className="row-sb text-sm">
                <span className="muted">Interactions semaine</span>
                <span style={{ fontWeight: 600 }}>131</span>
              </div>
              <div className="row-sb text-sm">
                <span className="muted">Adherent le plus actif</span>
                <span className="text-accent" style={{ fontWeight: 600 }}>
                  Amara S. (28)
                </span>
              </div>
              <div className="row-sb text-sm">
                <span className="muted">Question la plus frequente</span>
                <span style={{ fontWeight: 600 }}>Part 7 strategie</span>
              </div>
              <div className="row-sb text-sm">
                <span className="muted">Satisfaction estimee</span>
                <span className="text-success" style={{ fontWeight: 600 }}>
                  Tres positive
                </span>
              </div>
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.65rem" }}>
              Parametres globaux
            </h2>
            <div className="stack" style={{ gap: "0.4rem" }}>
              <div className="row-sb text-sm">
                <span className="muted">Modele IA</span>
                <span className="badge badge-accent">Claude Sonnet</span>
              </div>
              <div className="row-sb text-sm">
                <span className="muted">Contexte adherent</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="row-sb text-sm">
                <span className="muted">Scores dans contexte</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="row-sb text-sm">
                <span className="muted">Mode strict consignes</span>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
