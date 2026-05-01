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
    belief: "Le test adaptatif d'une heure est forcément plus facile.",
    truth: "Un format différent n'est pas forcément plus simple. La stratégie de réponse change en profondeur.",
  },
  {
    belief: "Faire des tests blancs tous les jours suffit pour progresser.",
    truth: "Sans analyse structurée, tu renforces surtout tes automatismes faibles.",
  },
  {
    belief: "Quatre heures par jour garantissent une progression rapide.",
    truth: "La saturation cognitive casse la rétention. L'intensité seule ne crée pas l'efficacité.",
  },
  {
    belief: "On peut changer de programme à J-7 sans risque.",
    truth: "Les changements tardifs désorganisent l'exécution, le rythme et la confiance.",
  },
  {
    belief: "Copier le plan d'un autre candidat est la meilleure option.",
    truth: "Chaque profil a ses fragilités. Le plan doit être cadré selon le niveau, l'objectif et le délai.",
  },
  {
    belief: "La prise de notes recommandée est secondaire.",
    truth: "La méthode de notes influence directement la précision en Listening.",
  },
  {
    belief: "Un bon score sur téléphone garantit le score officiel.",
    truth: "Les conditions réelles du test changent tout: casque, cadence, fatigue et pression.",
  },
  {
    belief: "Mémoriser beaucoup de grammaire suffit pour atteindre un grand score.",
    truth: "Le TOEIC évalue surtout la compréhension en contexte et la vitesse de décision.",
  },
  {
    belief: "Aller dans tous les sens aide à progresser plus vite.",
    truth: "La dispersion fait perdre du temps. Un plan clair, stable et suivi produit de meilleurs résultats.",
  },
  {
    belief: "Les formations les plus chères sont automatiquement meilleures.",
    truth: "Le résultat vient surtout de la structure, du suivi et de l'exécution quotidienne.",
  },
];

export const shortFaq = [
  {
    q: "Ce programme convient-il aux débutants ?",
    a: "Oui. Le parcours est cadré selon le niveau de départ, le score visé et l'échéance du test.",
  },
  {
    q: "Combien de temps par jour faut-il ?",
    a: "En général, entre 1 h et 2 h. La régularité compte davantage que le volume brut.",
  },
  {
    q: "Comment fonctionne l'accompagnement ?",
    a: "L'accompagnement s'appuie sur un Coach IA intégré à l'espace d'entraînement pour guider la progression au quotidien.",
  },
  {
    q: "Comment se passe l'accès ?",
    a: "Après validation de la candidature, les accès sont transmis rapidement et le parcours peut démarrer sans friction.",
  },
];

export const fullFaq = [
  {
    q: "Est-ce adapté aux débutants en anglais ?",
    a: "Oui. Le programme s'ajuste au point de départ et au score cible dès l'entrée dans le parcours.",
  },
  {
    q: "Combien de temps par jour dois-je consacrer au programme ?",
    a: "Entre 1 h et 1 h 30 en moyenne. La régularité reste la variable la plus décisive.",
  },
  {
    q: "Faut-il un bon niveau de grammaire pour commencer ?",
    a: "Non. Les points de grammaire utiles sont intégrés au parcours, dans un contexte directement exploitable.",
  },
  {
    q: "La prise de notes est-elle vraiment nécessaire ?",
    a: "Oui. Elle structure l'analyse, améliore la concentration et accélère les gains en Listening.",
  },
  {
    q: "Puis-je commencer si mon test est dans 6 semaines ?",
    a: "Oui, selon ton niveau de départ, ton objectif et la marge de progression disponible.",
  },
  {
    q: "Comment fonctionne le suivi ?",
    a: "Le suivi se fait dans l'espace d'entraînement avec un Coach IA aligné sur ton étape, tes erreurs récurrentes et ton objectif de score.",
  },
  {
    q: "Que m'apporte concrètement le Coach IA ?",
    a: "Il apporte des consignes d'exécution, un cadre de travail clair, des rappels utiles et une continuité dans la progression.",
  },
  {
    q: "Puis-je m'entraîner surtout sur téléphone ?",
    a: "Le mobile peut dépanner, mais le travail principal doit rester proche des conditions réelles du test.",
  },
  {
    q: "Que se passe-t-il si les 3 mois sont terminés ?",
    a: "Un prolongement peut être envisagé selon la progression observée et la date du test officiel.",
  },
];

export { testimonials } from "./testimonials";

export const programmeOverview = [
  {
    step: "ETAPE 1",
    title: "Embarquement",
    summary: "Configuration, outils, tableau de bord et cadre d'exécution",
    color: "var(--accent)",
  },
  {
    step: "ETAPE 2",
    title: "Listening",
    summary: "Neuro training, challenge mode et consignes spéciales",
    color: "#0098cc",
  },
  {
    step: "ETAPE 3",
    title: "Reading",
    summary: "Grammaire en contexte, business reading et stratégies",
    color: "var(--gold)",
  },
  {
    step: "ETAPE 4",
    title: "Deep Boost 2.0",
    summary: "Machinal level, révision ciblée et renforcement",
    color: "var(--success)",
  },
  {
    step: "ETAPE 5",
    title: "Anti Derangement",
    summary: "Mindset, résistance et préparation mentale finale",
    color: "var(--danger)",
  },
];

export const programmeSteps: ProgrammeStep[] = [
  {
    num: 1,
    label: "Étape 1 - Démarrage",
    title: "Embarquement",
    summary: "Poser les bases, configurer les outils et fixer les règles d'exécution.",
    items: [
      "Conditions de performance",
      "Feuille de prise de notes",
      "Guide d'astuces",
      "Tableau de bord",
      "Auto-pénalisations à éviter",
      "Accès à la plateforme",
      "Configuration et déroulement",
    ],
  },
  {
    num: 2,
    label: "Étape 2 - Listening",
    title: "Training Listening",
    summary: "Développer l'écoute active, la vitesse de traitement et la précision.",
    items: ["Consignes spéciales", "Neuro Training Listening", "Challenge Mode"],
    color: "#0098cc",
  },
  {
    num: 3,
    label: "Étape 3 - Reading",
    title: "Training Reading",
    summary: "Consolider la lecture en contexte et maîtriser la pression du temps.",
    items: ["Consignes spéciales", "Résumé de grammaire", "Training Reading", "Business Training"],
    color: "var(--gold)",
  },
  {
    num: 4,
    label: "Étape 4 - Consolidation",
    title: "Deep Boost 2.0",
    summary: "Automatiser les acquis et renforcer les zones encore fragiles.",
    items: ["Consignes spéciales", "Machinal Level", "Spectacular", "Révision ciblée", "Renforcement"],
    color: "var(--success)",
  },
  {
    num: 5,
    label: "Étape 5 - Final",
    title: "Anti Derangement",
    summary: "Stabiliser le mental et préparer les conditions du jour J.",
    items: ["Mindset Record", "Résistance", "Objectif Record", "Alimentation"],
    color: "var(--danger)",
  },
];

export const resources = [
  "Résumé de grammaire",
  "Feuille de prise de notes",
  "Guide d'astuces",
  "Tableau de bord de suivi",
  "Training configuré",
  "Coach IA intégré",
  "Communaute Discord VIP",
  "Protocole de mission",
];
