"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function ProfileMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu profil"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        {user ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-bold text-white">
            {user.email?.[0]?.toUpperCase() ?? "U"}
          </span>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-12 z-50 min-w-[200px] overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl"
          style={{ background: "var(--bg-2)" }}
        >
          {user ? (
            <>
              <div className="border-b border-[var(--border)] px-4 py-3">
                <p className="text-xs text-[var(--text-soft)]">Connecté en tant que</p>
                <p className="truncate text-sm font-semibold text-[var(--text)]">{user.email}</p>
              </div>
              <div className="flex flex-col p-2">
                <Link
                  href="/adherent/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
                >
                  Espace adhérent
                </Link>
                <Link
                  href="/adherent/parametres"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
                >
                  Mon profil
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[var(--danger)] transition hover:bg-[var(--danger-subtle)]"
                >
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col p-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
              >
                Inscription
              </Link>
              <Link
                href="/mot-de-passe-oublie"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
              >
                Mot de passe oublié
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
