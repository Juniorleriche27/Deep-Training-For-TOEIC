"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { publicNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ProfileMenu } from "@/components/auth/profile-menu";

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <span className="badge badge-accent public-premium-badge hidden 2xl:inline-flex">Programme premium</span>
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
            <div className="public-action-desktop">
              <ThemeToggle compact />
            </div>
            <div className="public-action-desktop">
              <ProfileMenu />
            </div>
            <Link
              href="/contact"
              className="btn-primary public-contact-desktop hidden rounded-xl px-4 py-3 text-sm font-semibold tracking-[0.04em] md:inline-flex"
            >
              Candidature →
            </Link>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="public-menu-btn lg:hidden"
            >
              <span className={open ? "is-open" : ""} />
              <span className={open ? "is-open" : ""} />
              <span className={open ? "is-open" : ""} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="public-mobile-backdrop fixed inset-0 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`public-mobile-panel fixed inset-x-3 z-40 lg:hidden ${open ? "open" : ""}`}
      >
        <div className="public-mobile-panel-top">
          <div className="public-mobile-tools">
            <ThemeToggle compact />
            <ProfileMenu />
          </div>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary rounded-xl px-3 py-3 text-center text-xs font-semibold"
          >
            Candidature
          </Link>
        </div>
        <nav className="public-mobile-nav">
          {publicNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`public-mobile-link ${active ? "public-mobile-link-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
