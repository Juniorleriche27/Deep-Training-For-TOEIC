const steps = [
  ["1", "Etape 1 - Embarquement", "Publiee", "var(--accent)"],
  ["2", "Etape 2 - Training Listening", "Publiee", "#0098CC"],
  ["3", "Etape 3 - Training Reading", "En cours (4 adherents)", "var(--gold)"],
  ["4", "Etape 4 - Deep Boost 2.0", "Publiee", "var(--success)"],
  ["5", "Etape 5 - Anti-Derangement", "Publiee", "var(--danger)"],
];

export default function AdminProgrammesPage() {
  return (
    <div>
      <div className="page-header row-sb">
        <div>
          <h1 className="page-title">Gestion des programmes</h1>
          <p className="page-sub">Modifier et publier etapes, objectifs et consignes.</p>
        </div>
        <button className="btn-primary rounded-md px-3 py-2 text-xs font-semibold">+ Nouvelle etape</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {steps.map((step, index) => (
          <div
            key={step[1]}
            className="row-sb"
            style={{
              padding: "0.85rem 1rem",
              borderBottom: index === steps.length - 1 ? undefined : "1px solid var(--border)",
              background: index === 2 ? "var(--accent-dim-2)" : undefined,
              borderLeft: index === 2 ? "2px solid var(--accent)" : undefined,
            }}
          >
            <div className="row">
              <span className="step-dot" style={{ width: "1.7rem", height: "1.7rem", fontSize: "0.72rem", background: step[3] }}>
                {step[0]}
              </span>
              <span className="card-title">{step[1]}</span>
            </div>
            <div className="row">
              <span className={`badge ${index === 2 ? "badge-accent" : "badge-success"}`}>{step[2]}</span>
              <button className={`rounded-md px-3 py-1 text-xs ${index === 2 ? "btn-secondary" : "btn-secondary"}`}>
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
