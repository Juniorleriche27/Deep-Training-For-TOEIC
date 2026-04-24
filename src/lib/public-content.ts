export type Myth = {
  belief: string;
  truth: string;
};

export type Testimonial = {
  id: string;
  initials: string;
  name: string;
  info: string;
  before: number | null;
  after: number | null;
  gain: string;
  quote: string;
  badges: Array<{ label: string; tone: "accent" | "gold" | "success" }>;
};

export type ProgrammeStep = {
  num: number;
  label: string;
  title: string;
  summary: string;
  items: string[];
  color?: string;
};

export const homeMyths: Myth[] = [
  {
    belief: "Le test adaptatif d'une heure est forcement plus facile.",
    truth: "Format different ne veut pas dire facilite. La strategie change totalement.",
  },
  {
    belief: "Faire des tests blancs tous les jours suffit pour progresser.",
    truth: "Sans analyse structuree, tu renforces les mauvaises habitudes.",
  },
  {
    belief: "4 heures par jour garantissent une progression rapide.",
    truth: "La saturation cognitive casse la retention. Intensite n'est pas efficacite.",
  },
  {
    belief: "On peut changer de programme a J-7 sans risque.",
    truth: "Les changements tardifs desorganisent l'execution et le rythme.",
  },
  {
    belief: "Copier le plan d'un autre candidat est la meilleure option.",
    truth: "Chaque profil a des faiblesses propres. Le plan doit etre contextualise.",
  },
  {
    belief: "La prise de notes recommandee est secondaire.",
    truth: "La methode de notes impacte directement le score Listening.",
  },
  {
    belief: "Un bon score sur telephone assure le score officiel.",
    truth: "Conditions reel test: casque, cadence et stress ne sont pas les memes.",
  },
  {
    belief: "Memoriser beaucoup de grammaire suffit pour un grand score.",
    truth: "Le TOEIC teste surtout la comprehension en contexte et la vitesse de decision.",
  },
  {
    belief: "Aller dans tous les sens aide a progresser vite.",
    truth: "La dispersion fait perdre du temps. Un plan unique et suivi gagne.",
  },
  {
    belief: "Les formations les plus cheres sont automatiquement meilleures.",
    truth: "Le resultat vient de la structure, du suivi et de l'execution quotidienne.",
  },
];

export const shortFaq = [
  {
    q: "Ce programme convient-il aux debutants ?",
    a: "Oui, le cadrage initial adapte le rythme et la charge selon le niveau de depart.",
  },
  {
    q: "Combien de temps par jour faut-il ?",
    a: "En general 1h a 2h. La regularite compte plus que le volume.",
  },
  {
    q: "Le Coach IA remplace-t-il le coach humain ?",
    a: "Non. L'IA assiste l'execution quotidienne, le coach humain pilote les decisions critiques.",
  },
  {
    q: "Comment se passe l'acces ?",
    a: "Apres validation de candidature, les acces sont transmis sous 24h.",
  },
];

export const fullFaq = [
  {
    q: "Est-ce adapte aux debutants en anglais ?",
    a: "Le programme s'adapte au point de depart. Le calibrage est fait a l'entree.",
  },
  {
    q: "Combien de temps par jour dois-je consacrer au programme ?",
    a: "Entre 1h et 1h30 en moyenne. La regularite reste la variable principale.",
  },
  {
    q: "Faut-il un bon niveau de grammaire pour commencer ?",
    a: "Non. Les points de grammaire utiles sont integres au parcours.",
  },
  {
    q: "La prise de notes est-elle vraiment obligatoire ?",
    a: "Oui, car elle structure l'analyse et accelere les gains en Listening.",
  },
  {
    q: "Puis-je commencer si mon test est dans 6 semaines ?",
    a: "C'est possible selon ton niveau de depart et ton objectif cible.",
  },
  {
    q: "Comment fonctionne le suivi avec le coach ?",
    a: "Le suivi se fait via la messagerie de la plateforme et les retests.",
  },
  {
    q: "Le Coach IA remplace-t-il le coach humain ?",
    a: "Non, l'IA complete le suivi humain mais ne le remplace pas.",
  },
  {
    q: "Puis-je m'entrainer surtout sur telephone ?",
    a: "Le mobile est utile en appoint, mais le mode principal doit rester proche des conditions reelles.",
  },
  {
    q: "Que se passe-t-il si les 3 mois sont termines ?",
    a: "Un renouvellement est possible selon progression et date du test.",
  },
];

export { testimonials } from "./testimonials";

export const programmeOverview = [
  {
    step: "ETAPE 1",
    title: "Embarquement",
    summary: "Configuration, outils, tableau de bord, regles de jeu",
    color: "var(--accent)",
  },
  {
    step: "ETAPE 2",
    title: "Listening",
    summary: "Neuro training, challenge mode, consignes speciales",
    color: "#0098cc",
  },
  {
    step: "ETAPE 3",
    title: "Reading",
    summary: "Grammaire en contexte, business reading, strategies",
    color: "var(--gold)",
  },
  {
    step: "ETAPE 4",
    title: "Deep Boost 2.0",
    summary: "Machinal level, revision ciblee, renforcement",
    color: "var(--success)",
  },
  {
    step: "ETAPE 5",
    title: "Anti Derangement",
    summary: "Mindset, resistance, preparation mentale finale",
    color: "var(--danger)",
  },
];

export const programmeSteps: ProgrammeStep[] = [
  {
    num: 1,
    label: "Etape 1 - Demarrage",
    title: "Embarquement",
    summary: "Poser les bases, configurer les outils et fixer les regles d'execution.",
    items: [
      "Conditions de performance",
      "Feuille de prise de notes",
      "Guide d'astuces",
      "Tableau de bord",
      "Auto-penalisations a eviter",
      "Acces training plateforme",
      "Configuration et deroulement",
    ],
  },
  {
    num: 2,
    label: "Etape 2 - Listening",
    title: "Training Listening",
    summary: "Developper ecoute active, vitesse de traitement et precision.",
    items: ["Consignes speciales", "Neuro Training Listening", "Challenge Mode"],
    color: "#0098cc",
  },
  {
    num: 3,
    label: "Etape 3 - Reading",
    title: "Training Reading",
    summary: "Consolider la lecture en contexte et maitriser la pression du temps.",
    items: ["Consignes speciales", "Resume grammaire", "Training Reading", "Business Training"],
    color: "var(--gold)",
  },
  {
    num: 4,
    label: "Etape 4 - Consolidation",
    title: "Deep Boost 2.0",
    summary: "Automatiser les acquis et renforcer les zones encore fragiles.",
    items: ["Consignes speciales", "Machinal Level", "Spectacular", "Revision ciblee", "Renforcement"],
    color: "var(--success)",
  },
  {
    num: 5,
    label: "Etape 5 - Final",
    title: "Anti Derangement",
    summary: "Stabiliser le mental et preparer les conditions du jour J.",
    items: ["Mindset Record", "Resistance", "Objectif Record", "Alimentation"],
    color: "var(--danger)",
  },
];

export const resources = [
  "Resume grammaire",
  "Feuille de prise de notes",
  "Guide d'astuces",
  "Tableau de bord de suivi",
  "Training configure",
  "Coach IA integre",
  "Communaute Discord VIP",
  "Accompagnement humain",
];
