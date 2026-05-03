"use client";

import { useState } from "react";

interface AuthFormProps {
  mode: "login" | "inscription" | "reset";
  onSubmit: (data: { email: string; password?: string; confirm?: string }) => Promise<void>;
  error?: string;
  success?: string;
}

export function AuthForm({ mode, onSubmit, error, success }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ email, password, confirm });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-soft)]">
          Adresse email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>

      {mode !== "reset" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-soft)]">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 pr-12 text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)] hover:text-[var(--text)]"
              aria-label={showPassword ? "Masquer" : "Afficher"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
      )}

      {mode === "inscription" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-soft)]">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 pr-12 text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--accent)]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)] hover:text-[var(--text)]"
              aria-label={showConfirm ? "Masquer" : "Afficher"}
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-[var(--danger)] bg-[var(--danger-subtle)] px-4 py-3 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-xl border border-[var(--success)] bg-[var(--success-subtle)] px-4 py-3 text-sm text-[var(--success)]">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-50"
      >
        {loading
          ? "Chargement…"
          : mode === "login"
          ? "Se connecter"
          : mode === "inscription"
          ? "Créer mon compte"
          : "Envoyer le lien"}
      </button>
    </form>
  );
}
