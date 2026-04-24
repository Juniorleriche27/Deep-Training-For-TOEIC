import { AppShell } from "@/components/workspace/app-shell";
import { adminNav } from "@/lib/navigation";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell
      accent="gold"
      context="Administration"
      nav={adminNav}
      user={{ avatar: "AD", name: "Administrateur", role: "Coach & Admin" }}
    >
      {children}
    </AppShell>
  );
}
