export interface AdherentUser {
  id: string;
  name: string;
  avatar: string;
  currentStep: number;
  currentStepLabel: string;
  deadline: string;
}

export interface MissionTask {
  num: string;
  title: string;
  sub: string;
  priority: "info" | "warn" | "urgent";
}

export interface ActivityEntry {
  date: string;
  action: string;
  type: string;
}

export interface StepSummary {
  num: number;
  name: string;
  status: "Completee" | "Active" | "Verrouillee";
  percent?: number;
}

export interface DashboardData {
  score: number;
  scoreStart: number;
  scoreObjectif: number;
  listening: number;
  reading: number;
  regularite: number;
  regulariteLabel: string;
  risquePrincipal: string;
  risqueDetail: string;
  missionDuJour: MissionTask[];
  progression: StepSummary[];
  progressionPercent: number;
  recentActivity: ActivityEntry[];
  coachTip: string;
}

export interface ProgrammeItem {
  label: string;
  color: string;
}

export interface ProgrammeStep {
  num: string;
  name: string;
  status: string;
  statusTone: string;
  desc: string;
  items: ProgrammeItem[];
  progress?: string;
  progressDetail?: string;
  active?: boolean;
  locked?: boolean;
}

export interface ScoreEntry {
  date: string;
  listening: number;
  reading: number;
  total: number;
  format: string;
  isCurrent?: boolean;
}

export interface PartAnalysis {
  part: string;
  percent: number;
  level: string;
}

export interface ScoreData {
  current: number;
  currentStart: number;
  listening: number;
  listeningStart: number;
  reading: number;
  readingStart: number;
  objectif: number;
  history: ScoreEntry[];
  analysis: PartAnalysis[];
  coachTip: string;
}

export interface Word {
  word: string;
  state: "mastered" | "review" | "";
}

export interface Note {
  id: string;
  title: string;
  meta: string;
  etape: string;
  content: string;
  words: Word[];
  tag?: string;
}

export interface Resource {
  id: string;
  title: string;
  meta: string;
  category: string;
  statuses: string[];
  tones: string[];
  icon: string;
  toneClass: string;
  locked?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  time: string;
  read: boolean;
  content: string;
  borderColor: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface CoachContext {
  etape: string;
  score: number;
  objectif: number;
  deadline: string;
  weakZones: string;
}
