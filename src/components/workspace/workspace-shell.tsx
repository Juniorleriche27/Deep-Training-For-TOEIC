"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation";

type WorkspaceShellProps = {
  title: string;
  subtitle: string;
  menu: NavItem[];
  children: React.ReactNode;
};

export function WorkspaceShell({ title, subtitle, menu, children }: WorkspaceShellProps) {
  const pathname = usePathname();

  return (
    <div className="surface-container grid min-h-[calc(100vh-7rem)] gap-6 lg:grid-cols-[230px_1fr]">
      <aside className="card-surface h-fit p-4 lg:sticky lg:top-24">
        <p className="font-[var(--font-heading)] text-base font-extrabold">{title}</p>
        <p className="muted mt-1 text-xs">{subtitle}</p>
        <nav className="mt-4 space-y-1">
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link block rounded-md px-3 py-2 text-sm transition ${
                  active ? "sidebar-link-active" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
