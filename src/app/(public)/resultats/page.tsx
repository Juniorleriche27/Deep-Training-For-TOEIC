import Link from "next/link";
import { TestimonialCard } from "@/components/public/testimonial-card";
import { testimonials } from "@/lib/public-content";

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
    <div className="stack" style={{ gap: "1.15rem" }}>
      <section className="public-page">
        <div className="public-page-hero">
          <div className="public-page-copy reveal-up">
            <p className="public-page-kicker">Résultats</p>
            <h1 className="public-page-title">
              Des preuves visibles.
              <br />
              Pas des promesses vagues.
            </h1>
            <p className="public-page-sub">
              Les résultats présentés ici illustrent une logique simple: quand l&apos;exécution devient plus
              propre, la progression devient plus lisible et le score suit.
            </p>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">Ce que montrent les résultats</h2>
            <ul className="public-spotlight-list">
              <li>Des hausses concrètes sur des profils différents.</li>
              <li>Une progression liée au cadre, pas au hasard.</li>
              <li>Une lecture du score plus stratégique et plus stable.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-stat-grid">
          <article className="public-stat-card reveal-up">
            <p className="public-stat-label">Progression moyenne</p>
            <p className="public-stat-value text-accent">+{kpis.avg} pts</p>
            <p className="public-stat-note">Points gagnés sur les profils mesurés</p>
          </article>
          <article className="public-stat-card reveal-up delay-1">
            <p className="public-stat-label">Validations 785+</p>
            <p className="public-stat-value text-success">{kpis.validated}</p>
            <p className="public-stat-note">Objectif diplôme atteint</p>
          </article>
          <article className="public-stat-card reveal-up delay-2">
            <p className="public-stat-label">Scores 900+</p>
            <p className="public-stat-value text-gold">{kpis.elite}</p>
            <p className="public-stat-note">Performances avancées</p>
          </article>
        </div>
      </section>

      <section className="public-section-stack">
        <div className="public-section-head">
          <p className="public-page-kicker">Témoignages</p>
          <h2 className="section-title">Des parcours documentés et crédibles</h2>
        </div>

        <div className="public-chip-row">
          <span className="public-chip">Progressions mesurées</span>
          <span className="public-chip">Validation 785+</span>
          <span className="public-chip">Scores 900+</span>
          <span className="public-chip">Exécution structurée</span>
        </div>

        <div className="cards-3">
          {testimonials.map((item) => (
            <div key={item.id} className="reveal-up">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </section>

      <section className="public-cta-band reveal-up delay-2">
        <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.9rem" }}>
          <div>
            <p className="public-page-kicker">Passer à l&apos;action</p>
            <h2 className="card-title" style={{ marginTop: "0.45rem", fontSize: "1.55rem" }}>
              Tu veux une progression pilotée, pas seulement espérée.
            </h2>
            <p className="card-desc">Découvre la méthode ou dépose directement ta candidature.</p>
          </div>
          <div className="row" style={{ flexWrap: "wrap" }}>
            <Link href="/methode" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
              Voir la méthode
            </Link>
            <Link href="/contact" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold">
              Candidater
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
