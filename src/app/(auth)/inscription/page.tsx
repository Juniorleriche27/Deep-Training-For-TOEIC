"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthForm } from "@/components/auth/auth-form";

export default function InscriptionPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async ({
    email,
    password,
    confirm,
  }: {
    email: string;
    password?: string;
    confirm?: string;
  }) => {
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({ email, password: password! });
    if (err) {
      setError(err.message);
      return;
    }
    setSuccess("Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse.");
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
      <h1 className="mb-1 font-heading text-2xl font-bold text-[var(--text)]">Créer un compte</h1>
      <p className="mb-8 text-sm text-[var(--text-soft)]">Rejoins Deep Training For TOEIC.</p>
      <AuthForm mode="inscription" onSubmit={handleSubmit} error={error} success={success} />
      <div className="mt-6 text-center text-sm text-[var(--text-soft)]">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-semibold text-[var(--accent)] hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
