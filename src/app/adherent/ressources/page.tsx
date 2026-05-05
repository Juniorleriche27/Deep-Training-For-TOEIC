export const dynamic = "force-dynamic";

import { apiServer as api } from "@/lib/api-server";

export default async function AdherentRessourcesPage() {
  const resources = await api.getRessources().catch(() => null);

  if (!resources) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Ressources</h1>
          <p className="page-sub text-danger">Impossible de charger les ressources. Reessayez dans un instant.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Ressources</h1>
        <p className="page-sub">Outils de travail disponibles selon ton etape.</p>
      </div>

      <div className="cards-2">
        {resources.map((resource) => (
          <article
            key={resource.id}
            className="res-card"
            style={resource.locked ? { opacity: 0.55 } : undefined}
          >
            <div
              className={`res-icon ${resource.toneClass || ""}`}
              style={!resource.toneClass ? { background: "var(--bg-3)" } : undefined}
            >
              {resource.icon}
            </div>
            <div>
              <h2 className="res-title">{resource.title}</h2>
              <p className="res-meta">{resource.meta}</p>
              <div className="res-status">
                {resource.statuses.map((item, index) => (
                  <span key={item} className={`badge ${resource.tones[index] ?? ""}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
