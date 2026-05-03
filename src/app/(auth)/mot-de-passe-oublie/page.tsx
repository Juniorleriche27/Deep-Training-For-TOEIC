"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthForm } from "@/components/auth/auth-form";

export default function MotDePasseOubliePage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async ({ email }: { email: string }) => {
    setError("");
    setSuccess("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/reset-password`,
    });
    if (err) {
      setError(err.message);
      return;
    }
    setSuccess("Lien envoyé ! Vérifie ta boîte mail.");
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
      <h1 className="mb-1 font-heading text-2xl font-bold text-[var(--text)]">Mot de passe oublié</h1>
      <p className="mb-8 text-sm text-[var(--text-soft)]">
        Saisis ton email et on t&apos;envoie un lien de réinitialisation.
      </p>
      <AuthForm mode="reset" onSubmit={handleSubmit} error={error} success={success} />
      <div className="mt-6 text-center text-sm text-[var(--text-soft)]">
        <Link href="/login" className="font-semibold text-[var(--accent)] hover:underline">
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
