export type NavItem = {
  badgeCount?: number;
  href: string;
  icon?: string;
  label: string;
};

export const publicNav: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/methode", label: "Methode" },
  { href: "/programme", label: "Programme" },
  { href: "/resultats", label: "Resultats" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Candidature" },
];

export const adherentNav: NavItem[] = [
  { href: "/adherent/dashboard", label: "Dashboard", icon: "DB" },
  { href: "/adherent/programme", label: "Programme", icon: "PR" },
  { href: "/adherent/ressources", label: "Ressources", icon: "RS" },
  { href: "/adherent/notes", label: "Prise de notes", icon: "NT" },
  { href: "/adherent/scores", label: "Scores & retests", icon: "SC" },
  { href: "/adherent/coach-ia", label: "Coach IA", icon: "IA" },
  { href: "/adherent/support", label: "Messages", icon: "MS", badgeCount: 2 },
  { href: "/adherent/parametres", label: "Parametres", icon: "ST" },
];

export const adminNav: NavItem[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: "OV" },
  { href: "/admin/adherents", label: "Adherents", icon: "AH", badgeCount: 2 },
  { href: "/admin/programmes", label: "Programmes", icon: "PG" },
  { href: "/admin/ressources", label: "Ressources", icon: "RS" },
  { href: "/admin/coach-ia", label: "Coach IA", icon: "IA" },
  { href: "/admin/temoignages", label: "Temoignages", icon: "TM" },
  { href: "/admin/abonnements", label: "Acces / Abonnements", icon: "AC" },
  { href: "/admin/parametres", label: "Parametres", icon: "ST" },
];
