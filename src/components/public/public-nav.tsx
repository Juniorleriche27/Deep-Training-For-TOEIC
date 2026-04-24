"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { publicNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <div className="surface-container flex h-16 items-center gap-5">
          <Link href="/" className="font-[var(--font-heading)] text-sm font-extrabold tracking-[0.14em]">
            Deep <span className="text-[var(--accent)]">Training</span> For TOEIC
          </Link>
          <span className="badge badge-accent hidden lg:inline-flex">Systeme Premium</span>
          <nav className="hidden items-center md:flex">
            {publicNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-xs font-medium tracking-[0.05em] transition ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-soft)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle compact />
            <Link
              href="/adherent/dashboard"
              className="hidden rounded-md border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text-soft)] transition hover:text-[var(--text)] md:inline-flex"
            >
              Acces Espace
            </Link>
            <Link
              href="/contact"
              className="btn-primary hidden rounded-md px-3 py-2 text-xs font-semibold tracking-[0.04em] md:inline-flex"
            >
              Candidature -&gt;
            </Link>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md border border-[var(--border)] bg-transparent md:hidden"
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
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(7,11,18,0.72)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="fixed inset-x-0 top-16 z-40 md:hidden"
        style={{
          background: "var(--bg-2)",
          borderBottom: "1px solid var(--border)",
          transform: open ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 260ms cubic-bezier(0.22,0.68,0.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav className="surface-container flex flex-col py-3">
          {publicNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-medium tracking-[0.04em] transition ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-soft)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.5rem", paddingTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <Link
              href="/adherent/dashboard"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-md border border-[var(--border)] px-3 py-2 text-center text-xs font-semibold text-[var(--text-soft)]"
            >
              Acces Espace
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary flex-1 rounded-md px-3 py-2 text-center text-xs font-semibold"
            >
              Candidature
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
