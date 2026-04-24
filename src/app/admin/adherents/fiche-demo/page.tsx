import Link from "next/link";

const scoreHistory = [
  ["12 Jan", "283", "262", "545", "-"],
  ["28 Jan", "300", "275", "575", "+30"],
  ["14 Fev", "320", "280", "600", "+25"],
  ["01 Mar", "335", "290", "625", "+25"],
  ["19 Avr", "358", "302", "660", "+35"],
];

export default function AdminAdherentDetailPage() {
  return (
    <div>
      <div className="page-header row-sb">
        <div>
          <Link href="/admin/adherents" className="btn-secondary inline-flex rounded-md px-3 py-1 text-xs">
            {"<- Retour adherents"}
          </Link>
          <h1 className="page-title" style={{ marginTop: "0.5rem" }}>
            Amara S.
          </h1>
          <p className="page-sub">Etape 3 - Score 660 - Test J-34</p>
        </div>
        <div className="row">
          <button className="btn-secondary rounded-md px-3 py-2 text-xs">Envoyer un message</button>
          <button className="btn-primary rounded-md px-3 py-2 text-xs">Debloquer etape suivante</button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="stack">
          <article className="profile-card">
            <div className="profile-avatar-lg">AS</div>
            <h2 className="profile-name">Amara S.</h2>
            <p className="profile-sub">amara.s@email.com - Inscrite le 12 Jan 2026</p>
            <div style={{ marginTop: "0.8rem" }}>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Score depart</span>
                <span className="profile-stat-val">545</span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Score actuel</span>
                <span className="profile-stat-val text-accent">660</span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Objectif</span>
                <span className="profile-stat-val text-gold">785</span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Test prevu</span>
                <span className="profile-stat-val text-warn">J-34</span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Format</span>
                <span className="profile-stat-val">TOEIC 2h</span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Statut</span>
                <span className="profile-stat-val">
                  <span className="badge badge-success">Actif</span>
                </span>
              </div>
            </div>

            <div className="stack" style={{ marginTop: "0.8rem", gap: "0.35rem" }}>
              <button className="btn-secondary rounded-md px-3 py-2 text-xs text-left">Envoyer un message</button>
              <button className="btn-secondary rounded-md px-3 py-2 text-xs text-left">Modifier le programme</button>
              <button className="btn-secondary rounded-md px-3 py-2 text-xs text-left">Envoyer une alerte</button>
              <button className="btn-secondary rounded-md px-3 py-2 text-xs text-left" style={{ color: "var(--danger)" }}>
                Suspendre l&apos;acces
              </button>
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.7rem" }}>
              Difficulte dominante
            </h2>
            <div className="progress-bars">
              <div className="pb-row">
                <span className="pb-label">Part 7</span>
                <span className="pb-track">
                  <span className="pb-fill" style={{ width: "48%", background: "var(--danger)" }} />
                </span>
                <span className="pb-val text-danger">Faible</span>
              </div>
              <div className="pb-row">
                <span className="pb-label">Part 6</span>
                <span className="pb-track">
                  <span className="pb-fill" style={{ width: "55%", background: "var(--warn)" }} />
                </span>
                <span className="pb-val text-warn">Moyen</span>
              </div>
              <div className="pb-row">
                <span className="pb-label">Part 1</span>
                <span className="pb-track">
                  <span className="pb-fill" style={{ width: "90%", background: "var(--success)" }} />
                </span>
                <span className="pb-val text-success">Fort</span>
              </div>
            </div>
          </article>
        </div>

        <div className="stack">
          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.75rem" }}>
              Historique des scores
            </h2>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Listening</th>
                    <th>Reading</th>
                    <th>Total</th>
                    <th>Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreHistory.map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td style={{ fontWeight: 600, color: row[0] === "19 Avr" ? "var(--accent)" : undefined }}>
                        {row[3]}
                      </td>
                      <td className={row[4].startsWith("+") ? "text-success" : "muted"} style={{ fontWeight: 600 }}>
                        {row[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.55rem" }}>
              Ressources consultees
            </h2>
            <div className="stack" style={{ gap: "0.35rem" }}>
              <div className="row-sb">
                <span className="muted text-sm">Feuille de prise de notes</span>
                <span className="badge badge-success">Consulte</span>
              </div>
              <div className="row-sb">
                <span className="muted text-sm">Resume grammaire</span>
                <span className="badge badge-success">Consulte</span>
              </div>
              <div className="row-sb">
                <span className="muted text-sm">Guide d&apos;astuces</span>
                <span className="badge badge-success">Consulte</span>
              </div>
              <div className="row-sb">
                <span className="muted text-sm">Config. Training Platform</span>
                <span className="badge badge-gold">Partiel</span>
              </div>
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.35rem" }}>
              Notes prises
            </h2>
            <p className="card-desc">8 notes creees - 14 mots tagues - 3 en &quot;A revoir&quot;.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
