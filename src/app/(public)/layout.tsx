import { PublicNav } from "@/components/public/public-nav";
import { PublicChatbotWidget } from "@/components/public/PublicChatbotWidget";
import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicNav />
      <main className="public-site-main public-page-enter">{children}</main>
      <PublicChatbotWidget />
      <footer className="surface-container pb-12">
        <section className="public-footer-shell reveal-up delay-2">
          <div className="public-footer-grid">
            <div className="public-footer-brand">
              <p className="section-tag">Deep Training For TOEIC</p>
              <h2 className="card-title" style={{ marginTop: "0.55rem", fontSize: "1.6rem" }}>
                Une préparation TOEIC pensée comme un système de progression.
              </h2>
              <p className="card-desc">
                Cadre structuré, méthodologie claire, suivi précis et expérience premium sur tout le parcours.
              </p>
            </div>

            <div>
              <p className="public-footer-title">Navigation</p>
              <div className="public-footer-links">
                <Link href="/methode">Méthode</Link>
                <Link href="/programme">Programme</Link>
                <Link href="/resultats">Résultats</Link>
                <Link href="/tarifs">Tarifs</Link>
                <Link href="/mentions-legales">Mentions legales</Link>
                <Link href="/politique-confidentialite">Confidentialite</Link>
              </div>
            </div>

            <div>
              <p className="public-footer-title">Passer à l&apos;action</p>
              <p className="card-desc">
                Dépose ta candidature et découvre un parcours plus rigoureux, plus lisible et plus efficace.
              </p>
              <div className="row" style={{ marginTop: "0.95rem", flexWrap: "wrap" }}>
                <Link href="/methode" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
                  Voir la méthode
                </Link>
                <Link href="/contact" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold">
                  Candidater
                </Link>
              </div>
            </div>
          </div>
          <div className="public-footer-legal">
            <span>Copyright © {new Date().getFullYear()} Deep Training For TOEIC. Tous droits reserves.</span>
            <Link href="/conditions-utilisation">Conditions d&apos;utilisation</Link>
          </div>
        </section>
      </footer>
    </>
  );
}
