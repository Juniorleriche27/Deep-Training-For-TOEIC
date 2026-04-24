import Link from "next/link";

const adherents = [
  ["AS", "Amara S.", "amara@email.com", "660", "785", "Etape 3", "Hier", "J-34", "Actif"],
  ["FL", "Fatou L.", "fatou@email.com", "800", "850", "Etape 4", "Auj.", "J-12", "Actif"],
  ["KD", "Kofi D.", "kofi@email.com", "580", "730", "Etape 2", "Il y a 8j", "J-21", "Inactif"],
  ["CB", "Claire B.", "claire@email.com", "740", "800", "Etape 3->4", "Auj.", "J-28", "A debloquer"],
  ["MK", "Moussa K.", "moussa@email.com", "615", "650", "Etape 3", "Il y a 2j", "J-45", "Stagnant"],
];

export default function AdminAdherentsPage() {
  return (
    <div>
      <div className="page-header row-sb">
        <div>
          <h1 className="page-title">Gestion des adherents</h1>
          <p className="page-sub">14 actifs - 3 inactifs - 6 leads en attente</p>
        </div>
        <button className="btn-primary rounded-md px-3 py-2 text-xs font-semibold">+ Nouvel adherent</button>
      </div>

      <div className="filter-bar">
        {["Tous (14)", "Actifs", "Inactifs", "Test proche", "Etape 1", "Etape 2", "Etape 3+"].map((filter, index) => (
          <button key={filter} className={`filter-btn ${index === 0 ? "active" : ""}`}>
            {filter}
          </button>
        ))}
        <input
          className="chat-input"
          style={{ borderRadius: "20px", maxWidth: "260px" }}
          placeholder="Rechercher un adherent..."
        />
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Adherent</th>
                <th>Score</th>
                <th>Objectif</th>
                <th>Etape</th>
                <th>Activite</th>
                <th>Test</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adherents.map((row) => (
                <tr key={row[1]} style={row[8] === "Inactif" ? { background: "var(--danger-dim)" } : undefined}>
                  <td>
                    <div className="row">
                      <div
                        className="user-avatar"
                        style={
                          row[0] === "FL"
                            ? { background: "var(--gold-dim)", color: "var(--gold)", borderColor: "rgba(245,166,35,.3)" }
                            : row[0] === "KD"
                              ? { background: "var(--danger-dim)", color: "var(--danger)", borderColor: "rgba(255,79,109,.3)" }
                              : row[0] === "CB"
                                ? { background: "var(--success-dim)", color: "var(--success)", borderColor: "rgba(0,212,156,.3)" }
                                : undefined
                        }
                      >
                        {row[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{row[1]}</div>
                        <div className="muted text-xs">{row[2]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-accent" style={{ fontWeight: 600 }}>
                    {row[3]}
                  </td>
                  <td className="muted">{row[4]}</td>
                  <td>
                    <span className="badge badge-accent">{row[5]}</span>
                  </td>
                  <td className={row[6] === "Il y a 8j" ? "text-danger" : "text-success"}>{row[6]}</td>
                  <td className={row[7] === "J-12" || row[7] === "J-21" ? "text-danger" : "text-warn"}>{row[7]}</td>
                  <td>
                    <span
                      className={`badge ${
                        row[8] === "Actif"
                          ? "badge-success"
                          : row[8] === "Inactif"
                            ? "badge-danger"
                            : row[8] === "A debloquer"
                              ? "badge-gold"
                              : "badge-gold"
                      }`}
                    >
                      {row[8]}
                    </span>
                  </td>
                  <td>
                    <div className="row">
                      <Link href="/admin/adherents/fiche-demo" className="icon-btn">
                        VW
                      </Link>
                      <button className="icon-btn">MS</button>
                      {row[8] === "Inactif" ? (
                        <button className="icon-btn" style={{ color: "var(--danger)", borderColor: "var(--danger)" }}>
                          RL
                        </button>
                      ) : null}
                      {row[8] === "A debloquer" ? (
                        <button className="icon-btn" style={{ color: "var(--success)", borderColor: "var(--success)" }}>
                          UK
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
