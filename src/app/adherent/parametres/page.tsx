export const dynamic = "force-dynamic";

import Link from "next/link";

const ACCOUNT_ACTIONS = [
  {
    title: "Modifier mon profil",
    desc: "Mettre à jour ton identité, ton objectif TOEIC, ton statut et ton échéance.",
    href: "/adherent/configuration",
    cta: "Ouvrir la configuration",
    tone: "badge-accent",
  },
  {
    title: "Changer mon mot de passe",
    desc: "Recevoir un lien sécurisé de réinitialisation par email.",
    href: "/mot-de-passe-oublie",
    cta: "Réinitialiser",
    tone: "badge-success",
  },
  {
    title: "Contacter le support",
    desc: "Signaler un problème, une demande de compte ou une question d'accès.",
    href: "/adherent/support",
    cta: "Envoyer un message",
    tone: "badge-gold",
  },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
];

export default function AdherentParametresPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Paramètres</h1>
        <p className="page-sub">Compte, sécurité, support et documents juridiques.</p>
      </div>

      <div className="grid-main">
        <div className="stack">
          {ACCOUNT_ACTIONS.map((item) => (
            <article
              key={item.title}
              className="card"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.85rem" }}
            >
              <div style={{ maxWidth: "34rem" }}>
                <div className="row" style={{ marginBottom: "0.3rem", flexWrap: "wrap" }}>
                  <h2 className="card-title">{item.title}</h2>
                  <span className={`badge ${item.tone}`}>Action disponible</span>
                </div>
                <p className="card-desc">{item.desc}</p>
              </div>
              <Link href={item.href} className="btn-primary rounded-md px-4 py-2 text-sm font-semibold">
                {item.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="stack">
          <article className="card">
            <h2 className="card-title" style={{ marginBottom: "0.65rem" }}>Documents juridiques</h2>
            <p className="card-desc" style={{ marginBottom: "0.8rem" }}>
              Accès direct aux pages obligatoires du site.
            </p>
            <div className="stack" style={{ gap: "0.5rem" }}>
              {LEGAL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="sidebar-item" style={{ width: "100%" }}>
                  <span className="sidebar-icon">LG</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </article>

          <article className="card" style={{ borderColor: "rgba(0,201,255,.3)" }}>
            <h2 className="card-title" style={{ marginBottom: "0.45rem" }}>Préférences d&apos;affichage</h2>
            <p className="card-desc">
              Le mode clair/sombre se règle depuis le bouton lune dans la barre supérieure.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
