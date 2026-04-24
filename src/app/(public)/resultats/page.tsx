import { TestimonialCard } from "@/components/public/testimonial-card";
import { testimonials } from "@/lib/public-content";

const filters = [
  "Tous",
  "Validation 785+",
  "Validation 900+",
  "Progression > 150 pts",
  "Parcours 3 mois",
];

function computeKpis() {
  const measurable = testimonials.filter(
    (item) => item.before !== null && item.after !== null
  );
  if (!measurable.length) {
    return { avg: 178, validated: 0, elite: 0 };
  }

  const avg = Math.round(
    measurable.reduce((sum, item) => sum + ((item.after ?? 0) - (item.before ?? 0)), 0) /
      measurable.length
  );
  const validated = measurable.filter((item) => (item.after ?? 0) >= 785).length;
  const elite = measurable.filter((item) => (item.after ?? 0) >= 900).length;

  return { avg, validated, elite };
}

export default function ResultatsPage() {
  const kpis = computeKpis();

  return (
    <div>
      <section className="section-shell surface-container">
        <div className="section-header reveal-up">
          <div className="section-tag">Preuves sociales</div>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2.15rem, 5vw, 3.1rem)" }}
          >
            Les resultats parlent
            <br />
            pour le systeme.
          </h1>
          <p className="section-sub">
            Les progres ne viennent pas d&apos;une motivation passagere: ils
            viennent d&apos;une execution rigoureuse, mesuree, suivie.
          </p>
        </div>

        <div className="cards-3">
          <article className="widget reveal-up delay-1">
            <p className="widget-label">Progression moyenne</p>
            <p className="widget-value text-accent">+{kpis.avg}</p>
            <p className="widget-trend">Points gagnes sur profils mesures</p>
          </article>
          <article className="widget reveal-up delay-2">
            <p className="widget-label">Validations 785+</p>
            <p className="widget-value text-success">{kpis.validated}</p>
            <p className="widget-trend up">Objectif diplome atteint</p>
          </article>
          <article className="widget reveal-up delay-3">
            <p className="widget-label">Scores elite 900+</p>
            <p className="widget-value text-gold">{kpis.elite}</p>
            <p className="widget-trend">Performance avancee</p>
          </article>
        </div>
      </section>

      <section className="section-shell surface-container">
        <div className="filter-bar">
          {filters.map((filter, index) => (
            <button key={filter} className={`filter-btn ${index === 0 ? "active" : ""}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="cards-3">
          {testimonials.map((item, index) => (
            <div key={item.id} className={`reveal-up delay-${(index % 3) + 1}`}>
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
