import type { Testimonial } from "@/lib/public-content";

function badgeToneClass(tone: Testimonial["badges"][number]["tone"]) {
  if (tone === "success") return "badge-success";
  if (tone === "gold") return "badge-gold";
  return "badge-accent";
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  const hasRange = item.before !== null && item.after !== null;
  const hasSingle = item.before === null && item.after !== null;

  return (
    <article className="testi-card">
      <div className="testi-before-after">
        {hasRange ? (
          <>
            <span className="score-pill score-before">{item.before}</span>
            <span className="score-sep">-&gt;</span>
            <span className="score-pill score-after">{item.after}</span>
          </>
        ) : null}
        {hasSingle ? <span className="score-pill score-after">{item.after}</span> : null}
        <span className="muted text-xs">{item.gain}</span>
      </div>
      <p className="testi-quote">&quot;{item.quote}&quot;</p>
      <div className="testi-meta">
        <div className="testi-avatar">{item.initials}</div>
        <div>
          <div className="testi-name">{item.name}</div>
          <div className="testi-info">{item.info}</div>
        </div>
      </div>
      <div className="testi-badges">
        {item.badges.map((badge) => (
          <span key={badge.label} className={`badge ${badgeToneClass(badge.tone)}`}>
            {badge.label}
          </span>
        ))}
      </div>
    </article>
  );
}
