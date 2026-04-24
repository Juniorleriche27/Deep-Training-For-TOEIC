import { testimonials } from "@/lib/public-content";

export default function AdminTemoignagesPage() {
  return (
    <div>
      <div className="page-header row-sb">
        <div>
          <h1 className="page-title">Temoignages & Resultats</h1>
          <p className="page-sub">Gestion des preuves sociales affichees sur le site public.</p>
        </div>
        <button className="btn-primary rounded-md px-3 py-2 text-xs font-semibold">
          Total: {testimonials.length}
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {testimonials.map((item, index) => {
          const scoreLine =
            item.before !== null && item.after !== null
              ? `${item.before} -> ${item.after} (${item.gain})`
              : item.after !== null
                ? `${item.after} (${item.gain})`
                : item.gain;

          return (
            <div className="cms-row" key={item.id} style={index === testimonials.length - 1 ? { borderBottom: 0 } : undefined}>
              <div className="cms-thumb" style={{ color: "var(--success)" }}>
                {item.initials}
              </div>
              <div className="cms-info">
                <div className="cms-name">{item.name}</div>
                <div className="cms-meta">
                  {item.info} - {scoreLine}
                </div>
              </div>
              <div className="row">
                <span className="badge badge-success">Publie</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
