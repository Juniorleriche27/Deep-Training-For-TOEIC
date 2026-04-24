import { AppShell } from "@/components/workspace/app-shell";
import { adherentNav } from "@/lib/navigation";
import { api } from "@/lib/api";

export default async function AdherentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await api.getMe().catch(() => ({
    id: "",
    name: "Adherent",
    avatar: "?",
    currentStep: 1,
    currentStepLabel: "Etape 1",
    deadline: "",
  }));

  return (
    <AppShell
      context="Espace adherent"
      nav={adherentNav}
      user={{
        avatar: user.avatar,
        name: user.name,
        role: `${user.currentStepLabel}${user.deadline ? ` - ${user.deadline}` : ""}`,
      }}
    >
      {children}
    </AppShell>
  );
}
