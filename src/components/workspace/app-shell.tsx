"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type AppShellProps = {
  accent?: "accent" | "gold";
  context: string;
  nav: NavItem[];
  user: { avatar: string; name: string; role: string };
  children: React.ReactNode;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/admin" || href === "/adherent") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({
  accent = "accent",
  context,
  nav,
  user,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const adminMode = accent === "gold";

  return (
    <div className="app-layout">
      <header className="app-topbar">
        <div className="topbar-logo">
          Deep <span>Training</span> For TOEIC
        </div>
        <span className={`badge ${adminMode ? "badge-gold" : "badge-accent"}`}>
          {adminMode ? "Control Center" : "Mission Cockpit"}
        </span>
        <div className="topbar-sep" />
        <div
          className="topbar-context"
          style={adminMode ? { color: "var(--gold)" } : undefined}
        >
          {context}
        </div>
        <div className="topbar-right">
          <ThemeToggle compact />
          <div className="notif-btn" aria-label="Notifications">
            NT
            <span className="notif-dot" />
          </div>
          <div className="topbar-user">
            <div
              className="user-avatar"
              style={
                adminMode
                  ? {
                      background: "var(--gold-dim)",
                      color: "var(--gold)",
                      borderColor: "rgba(245,166,35,0.3)",
                    }
                  : undefined
              }
            >
              {user.avatar}
            </div>
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div
                className="role"
                style={adminMode ? { color: "var(--gold)" } : undefined}
              >
                {user.role}
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside className="app-sidebar">
        <div className="sidebar-section">
          {adminMode && <div className="sidebar-label">Navigation</div>}
          {nav.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${active ? "active" : ""}`}
              >
                <span className="sidebar-icon">{item.icon ?? "--"}</span>
                <span>{item.label}</span>
                {item.badgeCount ? (
                  <span className="badge-count">{item.badgeCount}</span>
                ) : null}
              </Link>
            );
          })}
        </div>
        <div
          className="sidebar-section"
          style={{
            marginTop: "auto",
            paddingTop: "0.9rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link href="/" className="sidebar-item">
            <span className="sidebar-icon">WB</span>
            <span>Site public</span>
          </Link>
        </div>
      </aside>

      <main className="app-main">{children}</main>
    </div>
  );
}
