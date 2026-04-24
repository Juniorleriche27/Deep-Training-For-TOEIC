import Link from "next/link";
import { programmeSteps } from "@/lib/public-content";

export default function ProgrammePage() {
  return (
    <div>
      <section className="section-shell surface-container">
        <div className="section-header reveal-up">
          <div className="section-tag">Programme complet</div>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2.15rem, 5vw, 3.1rem)" }}
          >
            5 etapes.
            <br />
            Un systeme de transformation.
          </h1>
          <p className="section-sub">
            Chaque etape est construite pour debloquer la suivante: execution,
            progression, consolidation, validation.
          </p>
        </div>
      </section>

      <section className="section-shell surface-container">
        <div className="steps-timeline">
          {programmeSteps.map((step, index) => (
            <article
              key={step.title}
              className={`step-row reveal-up delay-${(index % 3) + 1}`}
            >
              <div className="step-line">
                <span
                  className="step-dot"
                  style={{ background: step.color ?? "var(--accent)" }}
                >
                  {step.num}
                </span>
                {index < programmeSteps.length - 1 ? (
                  <span className="step-connector" />
                ) : null}
              </div>
              <div className="step-body">
                <p className="step-label" style={{ color: step.color ?? "var(--accent)" }}>
                  {step.label}
                </p>
                <h2 className="step-title">{step.title}</h2>
                <p className="card-desc">{step.summary}</p>
                <div className="step-items">
                  {step.items.map((item) => (
                    <span key={item} className="step-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell surface-container">
        <article className="card reveal-up">
          <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
            <div>
              <p className="section-tag">Acces</p>
              <h2 className="card-title" style={{ fontSize: "1.45rem", marginTop: "0.4rem" }}>
                Pret a entrer dans le programme?
              </h2>
              <p className="card-desc">Validation de profil puis acces sous 24h.</p>
            </div>
            <div className="row">
              <Link href="/tarifs" className="btn-secondary rounded-md px-4 py-2 text-xs font-semibold">
                Voir l'acces
              </Link>
              <Link href="/contact" className="btn-primary rounded-md px-4 py-2 text-xs font-semibold">
                Candidater
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
