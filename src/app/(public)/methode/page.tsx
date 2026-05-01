import Link from "next/link";

const classicApproach = [
  "Enchaîner les tests blancs sans analyse de fond",
  "Confondre volume de travail et qualité d'exécution",
  "Mémoriser hors contexte au lieu de décider plus vite",
  "Travailler sans protocole de mission ni rythme stable",
];

const deepApproach = [
  "Un programme progressif en 5 étapes",
  "Des consignes d'exécution claires à chaque séance",
  "Une prise de notes utile, relue et exploitable",
  "Un pilotage précis par scores, retests et points faibles",
];

const pillars = [
  {
    title: "Architecture claire",
    body: "Chaque étape prépare la suivante pour éviter la dispersion et donner une vraie trajectoire.",
    code: "P1",
  },
  {
    title: "Exécution guidée",
    body: "Tu sais quoi faire, dans quel ordre, avec quel niveau d'exigence et quels critères de validation.",
    code: "P2",
  },
  {
    title: "Discipline productive",
    body: "Le cadre transforme la régularité en progression visible, au lieu de laisser l'effort se diluer.",
    code: "P3",
  },
  {
    title: "Décisions basées sur les faits",
    body: "Les choix ne reposent pas sur l'impression, mais sur les scores, les écarts et les erreurs répétées.",
    code: "P4",
  },
  {
    title: "Coach IA intégré",
    body: "Le Coach IA accompagne le travail quotidien, renforce la cadence et sécurise l'exécution.",
    code: "P5",
  },
  {
    title: "Progression mesurable",
    body: "Tout le système vise un résultat officiel, pas une sensation de travail bien rempli.",
    code: "P6",
  },
];

export default function MethodePage() {
  return (
    <div className="stack" style={{ gap: "1.15rem" }}>
      <section className="public-page">
        <div className="public-page-hero">
          <div className="public-page-copy reveal-up">
            <p className="public-page-kicker">Méthode</p>
            <h1 className="public-page-title">
              Ici, la préparation
              <br />
              devient un système.
            </h1>
            <p className="public-page-sub">
              Deep Training For TOEIC ne vend pas un simple cours. Le site repose sur une méthode
              d&apos;exécution structurée, pensée pour transformer le temps de travail en progression réelle.
            </p>
            <div className="public-chip-row">
              <span className="public-chip">Cadre clair</span>
              <span className="public-chip">Progression pilotée</span>
              <span className="public-chip">Coach IA intégré</span>
            </div>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">Ce que la méthode change vraiment</h2>
            <p className="public-spotlight-copy">
              Elle remplace l&apos;improvisation par une logique simple: comprendre, exécuter, mesurer, corriger.
            </p>
            <ul className="public-spotlight-list">
              <li>Une progression lisible au lieu d&apos;un empilement de ressources.</li>
              <li>Une charge de travail utile au lieu d&apos;un volume subi.</li>
              <li>Une préparation cohérente, plus fluide et plus crédible.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-two-grid">
          <article className="public-panel reveal-up">
            <p className="public-page-kicker" style={{ color: "var(--danger)" }}>Approche qui épuise</p>
            <ul className="public-list">
              {classicApproach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="public-panel reveal-up delay-1">
            <p className="public-page-kicker">Approche Deep Training For TOEIC</p>
            <ul className="public-list">
              {deepApproach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-section-head">
          <p className="public-page-kicker">Piliers</p>
          <h2 className="section-title">Les mécanismes qui rendent la progression plus solide</h2>
        </div>

        <div className="public-three-grid">
          {pillars.map((item) => (
            <article key={item.title} className="public-showcase-card reveal-up">
              <div className="card-icon icon-accent">{item.code}</div>
              <h3 className="public-panel-title">{item.title}</h3>
              <p className="public-panel-copy">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-cta-band reveal-up delay-2">
        <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.9rem" }}>
          <div>
            <p className="public-page-kicker">Étape suivante</p>
            <h2 className="card-title" style={{ marginTop: "0.45rem", fontSize: "1.55rem" }}>
              Voir comment la méthode se déploie dans le programme.
            </h2>
            <p className="card-desc">Découvre les 5 étapes et la logique complète du parcours.</p>
          </div>
          <div className="row" style={{ flexWrap: "wrap" }}>
            <Link href="/programme" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
              Voir le programme
            </Link>
            <Link href="/contact" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold">
              Soumettre ma candidature
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
