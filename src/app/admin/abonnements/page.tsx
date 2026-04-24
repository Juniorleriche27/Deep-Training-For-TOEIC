const accesses = [
  ["Amara S.", "12 Jan 2026", "12 Avr 2026", "J-34", "Actif"],
  ["Fatou L.", "15 Jan 2026", "15 Avr 2026", "J-12", "Actif"],
  ["Kofi D.", "10 Fev 2026", "10 Mai 2026", "J-21", "Inactif"],
  ["Claire B.", "20 Jan 2026", "20 Avr 2026", "J-28", "Renouvellement"],
];

export default function AdminAbonnementsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Acces & Abonnements</h1>
        <p className="page-sub">Gestion des durees d&apos;acces et renouvellements.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Adherent</th>
                <th>Debut acces</th>
                <th>Fin acces</th>
                <th>Duree restante</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accesses.map((row) => (
                <tr key={row[0]}>
                  <td style={{ fontWeight: 600 }}>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td
                    className={
                      row[3] === "J-12"
                        ? "text-danger"
                        : row[3] === "J-28"
                          ? "text-warn"
                          : row[3] === "J-34"
                            ? "text-success"
                            : "muted"
                    }
                    style={{ fontWeight: 600 }}
                  >
                    {row[3]}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        row[4] === "Actif"
                          ? "badge-success"
                          : row[4] === "Inactif"
                            ? "badge-gold"
                            : "badge-gold"
                      }`}
                    >
                      {row[4]}
                    </span>
                  </td>
                  <td>
                    <div className="row">
                      {row[4] === "Renouvellement" ? (
                        <button className="btn-primary rounded-md px-3 py-1 text-xs">Renouveler</button>
                      ) : (
                        <>
                          <button className="icon-btn">RN</button>
                          <button className="icon-btn" style={{ color: row[4] === "Actif" ? "var(--danger)" : "var(--success)" }}>
                            {row[4] === "Actif" ? "PA" : "ST"}
                          </button>
                        </>
                      )}
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
