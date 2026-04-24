"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M5.2 18.8l1.6-1.6M17.2 6.8l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 14.7A8.9 8.9 0 1 1 9.3 3.6a7.3 7.3 0 0 0 11.1 11.1z" />
    </svg>
  );
}

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("dtf-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const next = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const target: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(target);
    document.documentElement.dataset.theme = target;
    window.localStorage.setItem("dtf-theme", target);
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${compact ? "compact" : ""}`}
      onClick={toggleTheme}
      aria-label={`Activer mode ${next === "light" ? "jour" : "nuit"}`}
      title={`Mode ${next === "light" ? "jour" : "nuit"}`}
    >
      <span className="theme-toggle-icon">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
      {!compact ? (
        <span className="theme-toggle-label">
          {theme === "dark" ? "Mode nuit" : "Mode jour"}
        </span>
      ) : null}
    </button>
  );
}
