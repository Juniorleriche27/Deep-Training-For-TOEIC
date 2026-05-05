export const dynamic = "force-dynamic";

const UPCOMING = [
  { label: "Notifications email", desc: "Activer ou désactiver les rappels hebdomadaires." },
  { label: "Langue de l'interface", desc: "Choisir la langue d'affichage de la plateforme." },
  { label: "Changer de mot de passe", desc: "Mise à jour du mot de passe de connexion." },
  { label: "Supprimer mon compte", desc: "Demande de suppression des données personnelles." },
];

export default function AdherentParametresPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Paramètres</h1>
        <p className="page-sub">Préférences, notifications et sécurité de compte.</p>
      </div>

      <div className="stack" style={{ maxWidth: "600px", gap: "0.75rem" }}>
        {UPCOMING.map((item) => (
          <article key={item.label} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.label}</p>
              <p className="card-desc">{item.desc}</p>
            </div>
            <span className="badge">Bientôt disponible</span>
          </article>
        ))}
      </div>
    </div>
  );
}
