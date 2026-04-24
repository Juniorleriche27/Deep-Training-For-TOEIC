import { PublicNav } from "@/components/public/public-nav";
import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicNav />
      <main className="pt-20 pb-16">{children}</main>
      <footer className="surface-container pb-12">
        <section className="card">
          <div className="row-sb" style={{ flexWrap: "wrap", gap: "0.9rem" }}>
            <div>
              <p className="section-tag">Deep Training For TOEIC</p>
              <h2 className="card-title" style={{ marginTop: "0.45rem", fontSize: "1.35rem" }}>
                Systeme, discipline, execution.
              </h2>
              <p className="card-desc">Plateforme premium de progression TOEIC guidee.</p>
            </div>
            <div className="row">
              <Link href="/methode" className="btn-secondary rounded-md px-4 py-2 text-xs font-semibold">
                Voir la methode
              </Link>
              <Link href="/contact" className="btn-primary rounded-md px-4 py-2 text-xs font-semibold">
                Candidature
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
