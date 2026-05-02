const toeicFormats = [
  "Format : PC / 2h",
  "Format PC : PC / 1h adaptatif",
  "Format papier : 2h",
  "Je ne sais pas",
];

const qualificationSteps = [
  ["1", "Cadrage du profil", "Score actuel, objectif, echeance et format TOEIC vise."],
  ["2", "Prise de RDV guidee", "Le chat bot IA aide a cadrer la demande et a proposer un RDV utile."],
  ["3", "Activation de l'espace", "Embarquement, configuration et lancement du programme complet."],
];

const rdvScenarios = [
  "Verifier le bon format TOEIC avant de demarrer.",
  "Planifier la configuration de la plateforme externe d'entrainement.",
  "Preparer l'entree dans le programme avec un cadrage clair.",
];

export default function ContactPage() {
  return (
    <div className="stack" style={{ gap: "1.15rem" }}>
      <section className="public-page">
        <div className="public-page-hero">
          <div className="public-page-copy reveal-up">
            <p className="public-page-kicker">Candidature</p>
            <h1 className="public-page-title">
              Entrer dans le programme
              <br />
              avec un cadre clair.
            </h1>
            <p className="public-page-sub">
              Decris ton contexte, ton niveau actuel et ton objectif. Le cadrage
              permet de verifier l&apos;adequation entre ton besoin, ton delai et le
              programme propose.
            </p>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">Ce que nous voulons comprendre</h2>
            <ul className="public-spotlight-list">
              <li>Ton score actuel, ton score cible et ton echeance.</li>
              <li>Le format TOEIC vise ou l&apos;incertitude a clarifier.</li>
              <li>Les contraintes reelles qui influencent ton entrainement.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-two-grid">
          <article className="public-panel reveal-up">
            <h2 className="public-panel-title">Formulaire de candidature</h2>
            <p className="public-panel-copy">
              Remplis le formulaire avec des informations precises pour recevoir
              un retour plus pertinent.
            </p>
            <form className="stack" style={{ marginTop: "1rem" }}>
              <div className="form-grid">
                <label className="form-group">
                  <span className="form-label">Prenom et nom</span>
                  <input className="form-input" placeholder="Ex: Sophie Martin" type="text" />
                </label>
                <label className="form-group">
                  <span className="form-label">Email</span>
                  <input className="form-input" placeholder="votre@email.com" type="email" />
                </label>
                <label className="form-group">
                  <span className="form-label">Telephone</span>
                  <input className="form-input" placeholder="+33 6 ..." type="tel" />
                </label>
                <label className="form-group">
                  <span className="form-label">Score actuel</span>
                  <input className="form-input" placeholder="Ex: 520" type="number" />
                </label>
                <label className="form-group">
                  <span className="form-label">Score cible</span>
                  <input className="form-input" placeholder="Ex: 785" type="number" />
                </label>
                <label className="form-group">
                  <span className="form-label">Date prevue du test</span>
                  <input className="form-input" type="date" />
                </label>
                <label className="form-group">
                  <span className="form-label">Format TOEIC</span>
                  <select className="form-select" defaultValue="">
                    <option value="">Selectionnez</option>
                    {toeicFormats.map((format) => (
                      <option key={format}>{format}</option>
                    ))}
                  </select>
                </label>
                <label className="form-group">
                  <span className="form-label">Souhait principal</span>
                  <select className="form-select" defaultValue="">
                    <option value="">Selectionnez</option>
                    <option>Entrer dans le programme</option>
                    <option>Prendre un RDV de cadrage</option>
                    <option>Configurer la plateforme d&apos;entrainement</option>
                    <option>Je veux d&apos;abord comprendre le parcours</option>
                  </select>
                </label>
                <label className="form-group form-full">
                  <span className="form-label">Contexte et contraintes</span>
                  <textarea
                    className="form-textarea"
                    placeholder="Date limite, historique de scores, ressources deja testees, disponibilite..."
                  />
                </label>
              </div>
              <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
                <p className="muted text-xs">
                  Les informations partagees servent uniquement au cadrage de la candidature.
                </p>
                <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold">
                  Envoyer ma candidature
                </button>
              </div>
            </form>
          </article>

          <div className="stack">
            <article className="public-panel reveal-up delay-1">
              <p className="public-page-kicker">Chat bot IA</p>
              <h2 className="public-panel-title">Prise de RDV guidee</h2>
              <p className="public-panel-copy">
                Le chat bot IA filtre le besoin, clarifie le format TOEIC et
                oriente vers le bon prochain pas avant le RDV.
              </p>
              <div className="stack" style={{ marginTop: "0.85rem", gap: "0.55rem" }}>
                {rdvScenarios.map((item) => (
                  <div key={item} className="card-surface" style={{ padding: "0.85rem 0.9rem" }}>
                    <div className="card-desc">{item}</div>
                  </div>
                ))}
              </div>
              <div className="row" style={{ marginTop: "0.85rem", flexWrap: "wrap" }}>
                <button className="btn-primary rounded-md px-4 py-2 text-sm font-semibold">
                  Lancer le chat bot IA
                </button>
                <button className="btn-secondary rounded-md px-4 py-2 text-sm font-semibold">
                  Voir les creneaux
                </button>
              </div>
            </article>

            <article className="public-panel reveal-up delay-2">
              <p className="public-page-kicker">Suite du parcours</p>
              <div className="steps-timeline" style={{ marginTop: "1rem" }}>
                {qualificationSteps.map(([num, title, desc], index) => (
                  <div key={title} className="step-row">
                    <div className="step-line">
                      <span className="step-dot" style={{ width: "1.8rem", height: "1.8rem", fontSize: "0.74rem" }}>
                        {num}
                      </span>
                      {index < qualificationSteps.length - 1 ? <span className="step-connector" /> : null}
                    </div>
                    <div className="step-body pb-4">
                      <h3 className="card-title text-sm">{title}</h3>
                      <p className="card-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
