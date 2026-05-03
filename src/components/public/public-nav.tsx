"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { publicNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] public-nav-shell backdrop-blur-lg">
        <div className="surface-container public-nav-bar">
          <Link href="/" className="public-brand-lockup">
            <Image
              src="/logo.jpeg"
              alt="Deep Training For TOEIC"
              width={44}
              height={44}
              className="h-9 w-9 shrink-0 object-contain md:h-11 md:w-11"
              priority
            />
            <span className="public-brand-copy">
              <span className="public-brand-title">
                <span>Deep Training</span>
                <span>For TOEIC</span>
              </span>
            </span>
          </Link>
          <span className="badge badge-accent hidden 2xl:inline-flex">Programme premium</span>
          <nav className="public-nav-links hidden lg:flex">
            {publicNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`public-nav-link ${active ? "public-nav-link-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="public-nav-actions">
            <ThemeToggle compact />
            <Link
              href="/login"
              className="hidden rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[var(--accent)] hover:text-[var(--text)] md:inline-flex"
            >
              Accès Espace
            </Link>
            <Link
              href="/contact"
              className="btn-primary hidden rounded-xl px-4 py-3 text-sm font-semibold tracking-[0.04em] md:inline-flex"
            >
              Candidature →
            </Link>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-[var(--border)] bg-transparent lg:hidden"
            >
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "transform 220ms ease, opacity 200ms ease",
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "opacity 200ms ease",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "2px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transition: "transform 220ms ease, opacity 200ms ease",
                  transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(7,11,18,0.72)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="fixed inset-x-3 top-[4.65rem] z-40 lg:hidden"
        style={{
          background: "var(--bg-2)",
          border: "1px solid var(--border)",
          borderRadius: "1.2rem",
          boxShadow: "0 22px 60px rgba(0,0,0,0.28)",
          transform: open ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 260ms cubic-bezier(0.22,0.68,0.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col p-3">
          {publicNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold tracking-[0.02em] transition ${
                  active
                    ? "bg-[var(--accent-dim)] text-[var(--accent)]"
                    : "text-[var(--text-soft)] hover:bg-[var(--accent-dim-2)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.5rem", paddingTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-[var(--border)] px-3 py-3 text-center text-xs font-semibold text-[var(--text-soft)]"
            >
              Accès Espace
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary flex-1 rounded-xl px-3 py-3 text-center text-xs font-semibold"
            >
              Candidature
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
