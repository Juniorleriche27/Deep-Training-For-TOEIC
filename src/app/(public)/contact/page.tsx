export default function ContactPage() {
  return (
    <section className="section-shell surface-container">
      <div className="section-header reveal-up">
        <div className="section-tag">Candidature</div>
        <h1 className="section-title" style={{ fontSize: "clamp(2.1rem, 4.8vw, 3rem)" }}>
          Entrer dans le programme
        </h1>
        <p className="section-sub">
          Renseigne ton contexte. Le cadrage sert a verifier l&apos;adequation
          entre ton objectif et la methode.
        </p>
      </div>

      <div className="cards-2">
        <article className="card reveal-up delay-1">
          <h2 className="card-title">Formulaire de candidature</h2>
          <form className="stack" style={{ marginTop: "0.8rem" }}>
            <div className="form-grid">
              <label className="form-group">
                <span className="form-label">Prenom & Nom</span>
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
                  <option>TOEIC 2h (full)</option>
                  <option>TOEIC adaptatif 1h</option>
                  <option>Pas encore decide</option>
                </select>
              </label>
              <label className="form-group">
                <span className="form-label">Difficulte dominante</span>
                <select className="form-select" defaultValue="">
                  <option value="">Selectionnez</option>
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
                  placeholder="Date limite diplome, historique de scores, ressources deja testees..."
                />
              </label>
            </div>
            <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
              <p className="muted text-xs">
                Donnees traitees de maniere confidentielle dans le cadre du
                coaching.
              </p>
              <button type="submit" className="btn-primary rounded-md px-6 py-3 text-sm font-semibold">
                Envoyer ma candidature
              </button>
            </div>
          </form>
        </article>

        <article className="stack">
          <div className="card reveal-up delay-2">
            <p className="section-tag">Ce qui se passe ensuite</p>
            <div className="steps-timeline mt-4">
              {[
                ["1", "Analyse du profil", "Lecture de ton contexte et de ton objectif score."],
                ["2", "Retour de qualification", "Validation de l'adequation au programme."],
                ["3", "Activation", "Acces plateforme et lancement du parcours."],
              ].map(([num, title, desc], index) => (
                <div key={title} className="step-row">
                  <div className="step-line">
                    <span className="step-dot" style={{ width: "1.7rem", height: "1.7rem", fontSize: "0.72rem" }}>
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
          </div>

          <div className="card reveal-up delay-3">
            <p className="section-tag">Positionnement</p>
            <h2 className="card-title" style={{ marginTop: "0.4rem" }}>
              Tu n&apos;achetes pas un cours.
            </h2>
            <p className="card-desc">
              Tu entres dans un systeme de progression guidee avec execution
              stricte et suivi precis.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
