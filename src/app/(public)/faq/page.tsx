import Link from "next/link";
import { FaqList } from "@/components/public/faq-list";
import { fullFaq } from "@/lib/public-content";

export default function FaqPage() {
  return (
    <section className="section-shell surface-container">
      <div className="section-header reveal-up">
        <div className="section-tag">FAQ</div>
        <h1 className="section-title" style={{ fontSize: "clamp(2.15rem, 5vw, 3.1rem)" }}>
          Questions frequentes
          <br />
          sur le systeme.
        </h1>
        <p className="section-sub">
          Les points les plus demandes avant d&apos;entrer dans Deep Training For TOEIC.
        </p>
      </div>

      <article className="card reveal-up delay-1">
        <FaqList items={fullFaq} openFirst />
      </article>

      <article className="card reveal-up delay-2" style={{ marginTop: "1rem" }}>
        <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
          <div>
            <h2 className="card-title">Tu as une question specifique?</h2>
            <p className="card-desc">Detaille ton contexte, on te repond rapidement.</p>
          </div>
          <Link href="/contact" className="btn-primary rounded-md px-4 py-2 text-xs font-semibold">
            Poser ma question
          </Link>
        </div>
      </article>
    </section>
  );
}
