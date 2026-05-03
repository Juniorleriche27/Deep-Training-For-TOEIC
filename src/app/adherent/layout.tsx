export const dynamic = "force-dynamic";

import { AppShell } from "@/components/workspace/app-shell";
import { adherentNav } from "@/lib/navigation";
import { apiServer } from "@/lib/api-server";
import { createClient } from "@/lib/supabase/server";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function AdherentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  const meta = supabaseUser?.user_metadata ?? {};
  const metaName =
    meta.first_name && meta.last_name
      ? `${meta.first_name} ${meta.last_name}`
      : meta.first_name ?? null;

  const backendUser = await apiServer.getMe().catch(() => null);

  const displayName =
    metaName ?? backendUser?.name ?? "Profil à compléter";
  const avatar =
    metaName
      ? initials(metaName)
      : backendUser?.avatar && backendUser.avatar !== "AS"
      ? backendUser.avatar
      : "?";

  const stepLabel = backendUser?.currentStepLabel ?? "Embarquement";
  const deadline = backendUser?.deadline ?? "";

  return (
    <AppShell
      context="Espace adhérent"
      nav={adherentNav}
      user={{
        avatar,
        name: displayName,
        role: `${stepLabel}${deadline ? ` - ${deadline}` : ""}`,
      }}
    >
      {children}
    </AppShell>
  );
}
