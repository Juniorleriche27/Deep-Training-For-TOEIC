export const dynamic = "force-dynamic";

import { api } from "@/lib/api";

export default async function AdherentProgrammePage() {
  const programme = await api.getProgramme().catch(() => null);

  if (!programme) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Programme d&apos;entrainement</h1>
          <p className="page-sub text-danger">Impossible de charger le programme. Reessayez dans un instant.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Programme d&apos;entrainement</h1>
        <p className="page-sub">Parcours en {programme.length} etapes. Chaque etape completee debloque la suivante.</p>
      </div>

      <div className="stack">
        {programme.map((step) => (
          <article
            key={step.num}
            className="unlock-card"
            style={{
              opacity: step.locked ? 0.45 : 1,
              borderColor: step.active ? "rgba(0,201,255,.35)" : undefined,
              background: step.active ? "var(--card-2)" : undefined,
            }}
          >
            <div
              className="unlock-num"
              style={
                step.locked
                  ? { background: "var(--bg-3)", color: "var(--text-muted)", borderColor: "var(--border)" }
                  : undefined
              }
            >
              {step.num}
            </div>
            <div style={{ flex: 1 }}>
              <div className="row" style={{ flexWrap: "wrap" }}>
                <h2 className="step-name">{step.name}</h2>
                <span className={`badge ${step.statusTone}`}>{step.status}</span>
              </div>
              <p className="step-what">{step.desc}</p>
              <div className="unlock-list">
                {step.items.map((item) => (
                  <span key={item.label} className="unlock-tag" style={{ color: item.color }}>
                    {item.label}
                  </span>
                ))}
              </div>
              {step.progress && (
                <div style={{ marginTop: "0.7rem" }}>
                  <div className="prog-bar" style={{ margin: 0 }}>
                    <div className="prog-fill prog-accent" style={{ width: step.progress }} />
                  </div>
                  {step.progressDetail && (
                    <p className="muted text-xs" style={{ marginTop: "0.25rem" }}>{step.progressDetail}</p>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
