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
                Une preparation TOEIC pensee comme un systeme de progression.
              </h2>
              <p className="card-desc">
                Cadre structure, methodologie claire, suivi precis et experience premium sur tout le parcours.
              </p>
            </div>

            <div>
              <p className="public-footer-title">Navigation</p>
              <div className="public-footer-links">
                <Link href="/methode">Methode</Link>
                <Link href="/programme">Programme</Link>
                <Link href="/resultats">Resultats</Link>
                <Link href="/tarifs">Tarifs</Link>
              </div>
            </div>

            <div>
              <p className="public-footer-title">Passer a l&apos;action</p>
              <p className="card-desc">
                Depose ta candidature et decouvre un parcours plus rigoureux, plus lisible et plus efficace.
              </p>
              <div className="row" style={{ marginTop: "0.95rem", flexWrap: "wrap" }}>
                <Link href="/methode" className="btn-secondary rounded-xl px-4 py-3 text-xs font-semibold">
                  Voir la methode
                </Link>
                <Link href="/contact" className="btn-primary rounded-xl px-4 py-3 text-xs font-semibold">
                  Candidater
                </Link>
              </div>
            </div>

            <div>
              <p className="public-footer-title">Juridique</p>
              <div className="public-footer-links">
                <Link href="/mentions-legales">Mentions legales</Link>
                <Link href="/politique-confidentialite">Politique de confidentialite</Link>
                <Link href="/conditions-utilisation">Conditions d&apos;utilisation</Link>
              </div>
            </div>
          </div>

          <div className="public-footer-legal">
            <span>Copyright © {new Date().getFullYear()} Deep Training For TOEIC. Tous droits reserves.</span>
            <div className="public-footer-legal-links">
              <Link href="/mentions-legales">Mentions legales</Link>
              <Link href="/politique-confidentialite">Confidentialite</Link>
              <Link href="/conditions-utilisation">Conditions</Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
