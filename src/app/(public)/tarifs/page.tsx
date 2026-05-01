import Link from "next/link";

const included = [
  "Programme en 5 étapes débloqué progressivement",
  "Coach IA intégré au rythme du parcours",
  "Ressources premium: notes, grammaire, astuces et dashboard",
  "Suivi des scores, retests et zones de vigilance",
  "Activation personnalisée du parcours",
  "Communauté Discord dédiée",
  "Accès 3 mois renouvelable selon le besoin",
];

const accessFlow = [
  ["1", "Candidature", "Tu partages ton profil, ton score actuel, ton score cible et la date du test."],
  ["2", "Qualification", "Le besoin est cadré pour vérifier la cohérence entre ton objectif et le parcours."],
  ["3", "Activation", "L'accès est transmis et le programme démarre avec une structure claire."],
];

export default function TarifsPage() {
  return (
    <div className="stack" style={{ gap: "1.15rem" }}>
      <section className="public-page">
        <div className="public-page-hero">
          <div className="public-page-copy reveal-up">
            <p className="public-page-kicker">Tarifs</p>
            <h1 className="public-page-title">
              Une offre simple.
              <br />
              Un système complet.
            </h1>
            <p className="public-page-sub">
              Le site privilégie la clarté: un accès premium, une logique d&apos;exécution cohérente et
              une montée en score pensée comme un vrai parcours.
            </p>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">Ce que tu paies vraiment</h2>
            <ul className="public-spotlight-list">
              <li>Un cadre de progression plus lisible et plus structuré.</li>
              <li>Des ressources organisées pour être utilisées, pas juste consultées.</li>
                <li>Une expérience premium cohérente du premier accès jusqu&apos;au suivi.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="pricing-grid">
          <article className="pricing-card featured reveal-up">
            <span className="badge badge-accent">Accès premium</span>
            <h2 className="price-tag">
              Deep Training For TOEIC
              <br />
              <span className="text-[var(--accent)]">Système 3 mois</span>
            </h2>
            <p className="muted text-sm">
              Une offre pensée pour exécuter un programme complet, avec cohérence, méthode et lisibilité.
            </p>
            <ul className="price-features">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary inline-flex w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold">
              Soumettre ma candidature
            </Link>
            <p className="muted mt-3 text-center text-xs">
              Candidature gratuite. Réponse rapide après étude du profil.
            </p>
          </article>

          <div className="stack">
            <article className="public-panel reveal-up delay-1">
              <p className="public-page-kicker">Parcours d&apos;accès</p>
              <div className="steps-timeline mt-5">
                {accessFlow.map(([num, title, desc], index) => (
                  <div key={title} className="step-row">
                    <div className="step-line">
                      <span className="step-dot" style={{ width: "1.8rem", height: "1.8rem", fontSize: "0.74rem" }}>
                        {num}
                      </span>
                      {index < accessFlow.length - 1 ? <span className="step-connector" /> : null}
                    </div>
                    <div className="step-body pb-4">
                      <h3 className="card-title text-sm">{title}</h3>
                      <p className="card-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="public-panel reveal-up delay-2">
              <p className="public-page-kicker">Pour qui</p>
              <h3 className="public-panel-title">Le bon profil pour ce parcours</h3>
              <ul className="public-list">
                <li>Tu veux progresser sans dispersion.</li>
                <li>Tu veux une méthode plus nette et un cadre plus exigeant.</li>
                <li>Tu veux un accompagnement crédible, mesurable et professionnel.</li>
              </ul>
              <div className="row" style={{ marginTop: "0.95rem", flexWrap: "wrap" }}>
                <Link href="/methode" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
                  Voir la méthode
                </Link>
                <Link href="/programme" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
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
