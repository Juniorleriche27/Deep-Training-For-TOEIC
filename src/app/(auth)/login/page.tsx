"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async ({ email, password }: { email: string; password?: string }) => {
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password: password!,
    });
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/adherent/dashboard");
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
      <h1 className="mb-1 font-heading text-2xl font-bold text-[var(--text)]">Connexion</h1>
      <p className="mb-8 text-sm text-[var(--text-soft)]">Accède à ton espace adhérent.</p>
      <AuthForm mode="login" onSubmit={handleSubmit} error={error} />
      <div className="mt-6 flex flex-col gap-2 text-center text-sm text-[var(--text-soft)]">
        <Link href="/mot-de-passe-oublie" className="hover:text-[var(--accent)]">
          Mot de passe oublié ?
        </Link>
        <span>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-[var(--accent)] hover:underline">
            S&apos;inscrire
          </Link>
        </span>
      </div>
    </div>
  );
}
