export const dynamic = "force-dynamic";

import Link from "next/link";
import { api } from "@/lib/api";
import type { DashboardData } from "@/lib/types";

const PRIORITY_CLASS: Record<string, string> = {
  info: "info",
  warn: "warn",
  urgent: "urgent",
};

const STEP_STATUS_TONE: Record<string, string> = {
  Completee: "badge-success",
  Active: "badge-accent",
  Verrouillee: "",
};

function ScoreDiff({ value, start }: { value: number; start: number }) {
  const diff = value - start;
  return <p className={`widget-trend ${diff > 0 ? "up" : ""}`}>{diff > 0 ? `+${diff}` : diff} points depuis depart</p>;
}

export default async function AdherentDashboardPage() {
  const data: DashboardData | null = await api.getDashboard().catch(() => null);

  if (!data) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Cockpit adherent</h1>
          <p className="page-sub text-danger">Impossible de charger les donnees. Reessayez dans un instant.</p>
        </div>
      </div>
    );
  }

  const activeStepIndex = data.progression.findIndex((s) => s.status === "Active");

  return (
    <div>
      <div className="page-header reveal-up">
        <h1 className="page-title">Cockpit adherent</h1>
        <p className="page-sub">
          Etape active: <strong>{data.progression.find((s) => s.status === "Active")?.name ?? "-"}</strong>
          {data.progression.find((s) => s.status === "Active") && (
            <> | Progression: <strong>{data.progressionPercent}%</strong></>
          )}
        </p>
      </div>

      <div className="widgets-4">
        <article className="widget reveal-up delay-1">
          <p className="widget-label">Score actuel</p>
          <p className="widget-value text-accent">{data.score}</p>
          <ScoreDiff value={data.score} start={data.scoreStart} />
        </article>
        <article className="widget reveal-up delay-2">
          <p className="widget-label">Objectif valide</p>
          <p className="widget-value text-gold">{data.scoreObjectif}</p>
          <p className="widget-trend">{data.scoreObjectif - data.score} points restants</p>
        </article>
        <article className="widget reveal-up delay-3">
          <p className="widget-label">Regularite 7 jours</p>
          <p className="widget-value text-success">{data.regularite}%</p>
          <p className="widget-trend up">{data.regulariteLabel}</p>
        </article>
        <article className="widget reveal-up delay-1">
          <p className="widget-label">Risque principal</p>
          <p className="widget-value text-warn" style={{ fontSize: "1.2rem", paddingTop: "0.34rem" }}>
            {data.risquePrincipal}
          </p>
          <p className="widget-trend">{data.risqueDetail}</p>
        </article>
      </div>

      <div className="grid-main">
        <div className="stack">
          <article className="card reveal-up delay-1" style={{ borderColor: "rgba(34,211,255,.35)" }}>
            <div className="row-sb" style={{ marginBottom: "0.85rem" }}>
              <h2 className="card-title">Mission du jour</h2>
              <span className="badge badge-accent">Priorite haute</span>
            </div>
            <div className="stack" style={{ gap: "0.5rem" }}>
              {data.missionDuJour.map((task) => (
                <div key={task.num} className={`alert-row ${PRIORITY_CLASS[task.priority] ?? "info"}`}>
                  <div className="alert-row-icon">{task.num}</div>
                  <div>
                    <div className="alert-row-title">{task.title}</div>
                    <div className="alert-row-sub">{task.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row" style={{ marginTop: "0.85rem", flexWrap: "wrap" }}>
              <Link href="/adherent/programme" className="btn-secondary rounded-md px-3 py-2 text-xs font-semibold">
                Voir programme
              </Link>
              <Link href="/adherent/scores" className="btn-secondary rounded-md px-3 py-2 text-xs font-semibold">
                Mettre a jour score
              </Link>
              <Link href="/adherent/coach-ia" className="btn-primary rounded-md px-3 py-2 text-xs font-semibold">
                Ouvrir Coach IA
              </Link>
            </div>
          </article>

          <article className="card reveal-up delay-2">
            <div className="row-sb" style={{ marginBottom: "0.7rem" }}>
              <h2 className="card-title">Activite recente</h2>
              <span className="badge badge-success">{data.recentActivity.length} actions tracees</span>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Temps</th>
                    <th>Action</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentActivity.map((entry, i) => (
                    <tr key={i}>
                      <td>{entry.date}</td>
                      <td>{entry.action}</td>
                      <td>
                        <span className="badge badge-accent">{entry.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <div className="stack">
          <article className="card reveal-up delay-1">
            <div className="row-sb" style={{ marginBottom: "0.75rem" }}>
              <h2 className="card-title">Progression etapes</h2>
              <span className="badge badge-accent">{data.progressionPercent}%</span>
            </div>
            <div className="stack" style={{ gap: "0.38rem" }}>
              {data.progression.map((step, index) => (
                <div
                  key={step.num}
                  className="row-sb"
                  style={{
                    padding: "0.5rem 0.55rem",
                    borderRadius: "0.45rem",
                    background: step.status === "Active" ? "var(--accent-dim-2)" : "var(--bg-3)",
                    border: step.status === "Active" ? "1px solid rgba(34,211,255,.3)" : "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "0.8rem" }}>Etape {step.num} - {step.name}</span>
                  <span className={`badge ${STEP_STATUS_TONE[step.status] ?? ""}`}>{step.status}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card reveal-up delay-3" style={{ borderColor: "rgba(34,211,255,.35)" }}>
            <div className="row" style={{ marginBottom: "0.65rem" }}>
              <div className="ai-avatar">IA</div>
              <div>
                <div className="card-title" style={{ fontSize: "0.95rem" }}>Coach IA contextuel</div>
                <div className="chat-ai-status">Connecte - regles etape active chargees</div>
              </div>
            </div>
            <p className="card-desc">{data.coachTip}</p>
            <Link
              href="/adherent/coach-ia"
              className="btn-primary inline-flex w-full justify-center rounded-md px-3 py-2 text-xs font-semibold"
            >
              Continuer avec le Coach IA
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
}
