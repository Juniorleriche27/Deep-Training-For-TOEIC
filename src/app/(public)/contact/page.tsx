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
              Décris ton contexte, ton niveau actuel et ton objectif. Le cadrage permet de vérifier
              l&apos;adéquation entre ton besoin, ton délai et la méthode proposée.
            </p>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">Ce que nous voulons comprendre</h2>
            <ul className="public-spotlight-list">
              <li>Ton score actuel, ton score cible et ton échéance.</li>
              <li>Ta difficulté dominante: Listening, Reading ou gestion du temps.</li>
              <li>Les contraintes réelles qui influencent ton entraînement.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-two-grid">
          <article className="public-panel reveal-up">
            <h2 className="public-panel-title">Formulaire de candidature</h2>
            <p className="public-panel-copy">
              Remplis le formulaire avec des informations précises pour recevoir un retour plus pertinent.
            </p>
            <form className="stack" style={{ marginTop: "1rem" }}>
              <div className="form-grid">
                <label className="form-group">
                  <span className="form-label">Prénom et nom</span>
                  <input className="form-input" placeholder="Ex: Sophie Martin" type="text" />
                </label>
                <label className="form-group">
                  <span className="form-label">Email</span>
                  <input className="form-input" placeholder="votre@email.com" type="email" />
                </label>
                <label className="form-group">
                  <span className="form-label">Téléphone</span>
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
                  <span className="form-label">Date prévue du test</span>
                  <input className="form-input" type="date" />
                </label>
                <label className="form-group">
                  <span className="form-label">Format TOEIC</span>
                  <select className="form-select" defaultValue="">
                    <option value="">Sélectionnez</option>
                    <option>TOEIC 2h (full)</option>
                    <option>TOEIC adaptatif 1h</option>
                    <option>Je ne sais pas encore</option>
                  </select>
                </label>
                <label className="form-group">
                  <span className="form-label">Difficulté dominante</span>
                  <select className="form-select" defaultValue="">
                    <option value="">Sélectionnez</option>
                    <option>Listening</option>
                    <option>Reading</option>
                    <option>Les deux</option>
                    <option>Gestion du temps</option>
                  </select>
                </label>
                <label className="form-group form-full">
                  <span className="form-label">Contexte et contraintes</span>
                  <textarea
                    className="form-textarea"
                    placeholder="Date limite, historique de scores, ressources déjà testées, disponibilité..."
                  />
                </label>
              </div>
              <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
                <p className="muted text-xs">
                  Les informations partagées servent uniquement au cadrage de la candidature.
                </p>
                <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold">
                  Envoyer ma candidature
                </button>
              </div>
            </form>
          </article>

          <div className="stack">
            <article className="public-panel reveal-up delay-1">
              <p className="public-page-kicker">Suite du parcours</p>
              <div className="steps-timeline mt-4">
                {[
                  ["1", "Analyse du profil", "Lecture du contexte, du score visé et de l'échéance."],
                  ["2", "Retour de qualification", "Vérification de l'adéquation avec le parcours."],
                  ["3", "Activation", "Transmission des accès et démarrage structuré."],
                ].map(([num, title, desc], index) => (
                  <div key={title} className="step-row">
                    <div className="step-line">
                      <span className="step-dot" style={{ width: "1.8rem", height: "1.8rem", fontSize: "0.74rem" }}>
                        {num}
                      </span>
                      {index < 2 ? <span className="step-connector" /> : null}
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
              <p className="public-page-kicker">Positionnement</p>
              <h2 className="public-panel-title">Tu n&apos;achètes pas un simple cours.</h2>
              <p className="public-panel-copy">
                Tu entres dans une expérience de progression structurée, avec une navigation claire,
                un design premium et une logique d&apos;entraînement cohérente.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
