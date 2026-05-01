import Link from "next/link";
import { FaqList } from "@/components/public/faq-list";
import { fullFaq } from "@/lib/public-content";

export default function FaqPage() {
  return (
    <div className="stack" style={{ gap: "1.15rem" }}>
      <section className="public-page">
        <div className="public-page-hero">
          <div className="public-page-copy reveal-up">
            <p className="public-page-kicker">FAQ</p>
            <h1 className="public-page-title">
              Les réponses utiles
              <br />
              avant d&apos;entrer.
            </h1>
            <p className="public-page-sub">
              Voici les points les plus consultés avant de rejoindre Deep Training For TOEIC:
              format, rythme, logique du parcours et fonctionnement général.
            </p>
          </div>

          <aside className="public-page-spotlight reveal-up delay-1">
            <h2 className="public-spotlight-title">En résumé</h2>
            <ul className="public-spotlight-list">
              <li>Le programme s&apos;adapte au point de départ et au score visé.</li>
              <li>La méthode repose sur la régularité, pas sur la surcharge.</li>
              <li>L&apos;expérience est pensée pour être claire, fluide et exploitable.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="public-section-stack">
        <article className="public-panel reveal-up">
          <FaqList items={fullFaq} openFirst />
        </article>
      </section>

      <section className="public-cta-band reveal-up delay-2">
        <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.9rem" }}>
          <div>
            <p className="public-page-kicker">Besoin d&apos;un échange</p>
            <h2 className="card-title" style={{ marginTop: "0.45rem", fontSize: "1.55rem" }}>
              Une question plus précise sur ton contexte ?
            </h2>
            <p className="card-desc">Expose ton objectif, ton délai et ton niveau actuel.</p>
          </div>
          <Link href="/contact" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold">
            Poser ma question
          </Link>
        </div>
      </section>
    </div>
  );
}
