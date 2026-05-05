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
  const workspaceHome = adminMode ? "/admin" : "/adherent/dashboard";
  const avatarStyle = adminMode
    ? {
        background: "var(--gold-dim)",
        color: "var(--gold)",
        borderColor: "rgba(245,166,35,0.3)",
      }
    : undefined;
  const roleStyle = adminMode ? { color: "var(--gold)" } : undefined;

  return (
    <div className="app-layout">
      <header className="app-topbar">
        <div className="topbar-brand">
          <Link href="/" className="topbar-logo">
            Deep <span>Training</span> For TOEIC
          </Link>
          <span
            className={`badge topbar-badge ${adminMode ? "badge-gold" : "badge-accent"}`}
          >
            {adminMode ? "Control Center" : "Mission Cockpit"}
          </span>
        </div>

        <div className="topbar-switch">
          <Link href="/" className={`topbar-switch-link ${pathname === "/" ? "topbar-switch-link-active" : ""}`}>
            Site public
          </Link>
          <Link
            href={workspaceHome}
            className={`topbar-switch-link ${
              pathname.startsWith(adminMode ? "/admin" : "/adherent")
                ? "topbar-switch-link-active"
                : ""
            }`}
          >
            {context}
          </Link>
        </div>

        <div className="topbar-right">
          <div className="topbar-user topbar-user-desktop">
            <div className="user-avatar" style={avatarStyle}>
              {user.avatar}
            </div>
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div className="role" style={roleStyle}>
                {user.role}
              </div>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="topbar-avatar-mobile">
              <div className="user-avatar" style={avatarStyle}>
                {user.avatar}
              </div>
            </div>
            <ThemeToggle compact />
            <div className="notif-btn" aria-label="Notifications">
              NT
              <span className="notif-dot" />
            </div>
          </div>
        </div>

        <div className="topbar-mobile-user">
          <div className="topbar-mobile-user-name">{user.name}</div>
          <div className="topbar-mobile-user-role" style={roleStyle}>
            {user.role}
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
            <span>Retour au site public</span>
          </Link>
        </div>
      </aside>

      <main className="app-main">{children}</main>
    </div>
  );
}
