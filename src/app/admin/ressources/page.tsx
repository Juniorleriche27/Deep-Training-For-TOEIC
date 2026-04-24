export const dynamic = "force-dynamic";

const resources = [
  ["NT", "Feuille de prise de notes", "PDF - Etape 1 - 14 consultations", "Visible"],
  ["GR", "Resume grammaire TOEIC", "PDF - Etape 3 - 9 consultations", "Visible"],
  ["GS", "Guide d'astuces complet", "PDF - Toutes etapes - 12 consultations", "Visible"],
  ["CF", "Configuration Training Platform", "Guide video - Etape 1 - 8 consultations", "Partielle"],
  ["LK", "Machinal Level - Consignes avancees", "PDF - Etape 4 - Verrouillee", "Verrouille"],
];

export default function AdminRessourcesPage() {
  return (
    <div>
      <div className="page-header row-sb">
        <div>
          <h1 className="page-title">Gestion des ressources</h1>
          <p className="page-sub">Bibliotheque de contenu partagee avec les adherents.</p>
        </div>
        <button className="btn-primary rounded-md px-3 py-2 text-xs font-semibold">+ Ajouter une ressource</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {resources.map((resource, index) => (
          <div className="cms-row" key={resource[1]} style={index === resources.length - 1 ? { borderBottom: 0 } : undefined}>
            <div className="cms-thumb">{resource[0]}</div>
            <div className="cms-info">
              <div className="cms-name">{resource[1]}</div>
              <div className="cms-meta">{resource[2]}</div>
            </div>
            <div className="row">
              <span
                className={`badge ${
                  resource[3] === "Visible"
                    ? "badge-success"
                    : resource[3] === "Partielle"
                      ? "badge-gold"
                      : "badge"
                }`}
              >
                {resource[3]}
              </span>
              <div className="cms-actions">
                <button className="icon-btn">ED</button>
                <button className="icon-btn">CP</button>
                <button className="icon-btn" style={{ color: "var(--danger)" }}>
                  DL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
