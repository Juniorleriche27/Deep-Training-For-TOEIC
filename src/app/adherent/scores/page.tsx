import { api } from "@/lib/api";

const PART_COLOR: Record<string, string> = {
  Fort: "var(--success)",
  Bon: "var(--accent)",
  Moyen: "var(--accent)",
  Faible: "var(--warn)",
  "Tres faible": "var(--danger)",
};

export default async function AdherentScoresPage() {
  const data = await api.getScores().catch(() => null);

  if (!data) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Scores & Retests</h1>
          <p className="page-sub text-danger">Impossible de charger les scores. Reessayez dans un instant.</p>
        </div>
      </div>
    );
  }

  const maxTotal = Math.max(...data.history.map((h) => h.total), 1);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Scores & Retests</h1>
        <p className="page-sub">Historique complet de progression et zones prioritaires.</p>
      </div>

      <div className="widgets-4">
        <article className="widget">
          <p className="widget-label">Score actuel</p>
          <p className="widget-value text-accent">{data.current}</p>
          <p className="widget-trend up">+{data.current - data.currentStart} depuis depart</p>
        </article>
        <article className="widget">
          <p className="widget-label">Listening actuel</p>
          <p className="widget-value text-success">{data.listening}</p>
          <p className="widget-trend up">+{data.listening - data.listeningStart} depuis depart</p>
        </article>
        <article className="widget">
          <p className="widget-label">Reading actuel</p>
          <p className="widget-value text-gold">{data.reading}</p>
          <p className="widget-trend up">+{data.reading - data.readingStart} depuis depart</p>
        </article>
        <article className="widget">
          <p className="widget-label">Objectif restant</p>
          <p className="widget-value text-warn">{data.objectif - data.current}</p>
          <p className="widget-trend">Pts a gagner</p>
        </article>
      </div>

      <div className="grid-main">
        <div className="stack">
          <article className="scores-chart-fake">
            <div className="row-sb" style={{ marginBottom: "0.9rem" }}>
              <h2 className="card-title">Progression globale</h2>
              <div className="row">
                <span style={{ color: "var(--accent)", fontSize: "0.68rem" }}>LIST</span>
                <span style={{ color: "var(--gold)", fontSize: "0.68rem" }}>READ</span>
              </div>
            </div>
            <div className="score-history">
              {data.history.map((entry, index) => {
                const height = Math.round((entry.total / maxTotal) * 100);
                return (
                  <div key={entry.date} className="sh-col">
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", width: "100%" }}>
                      <div className="sh-bar" style={{ height: `${height}%` }} />
                    </div>
                    <span className="sh-date">{entry.date}</span>
                    <span
                      className="sh-total"
                      style={entry.isCurrent ? { color: "var(--accent)", fontWeight: 700 } : undefined}
                    >
                      {entry.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.8rem" }}>Zones d&apos;analyse</h2>
            <div className="progress-bars">
              {data.analysis.map((row) => {
                const color = PART_COLOR[row.level] ?? "var(--accent)";
                return (
                  <div key={row.part} className="pb-row">
                    <span className="pb-label">{row.part}</span>
                    <span className="pb-track">
                      <span className="pb-fill" style={{ width: `${row.percent}%`, background: color }} />
                    </span>
                    <span className="pb-val" style={{ color }}>{row.level}</span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <div className="stack">
          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.8rem" }}>Historique des tests</h2>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Listening</th>
                    <th>Reading</th>
                    <th>Total</th>
                    <th>Format</th>
                  </tr>
                </thead>
                <tbody>
                  {data.history.map((row) => (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td>{row.listening}</td>
                      <td>{row.reading}</td>
                      <td style={{ fontWeight: 600, color: row.isCurrent ? "var(--accent)" : undefined }}>{row.total}</td>
                      <td>
                        <span className={`badge ${row.isCurrent ? "badge-accent" : ""}`}>{row.format}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="card" style={{ borderColor: "rgba(0,201,255,.3)" }}>
            <h2 className="card-title" style={{ marginBottom: "0.45rem" }}>Conseil Coach IA</h2>
            <p className="card-desc">{data.coachTip}</p>
          </article>
        </div>
      </div>
    </div>
  );
}
