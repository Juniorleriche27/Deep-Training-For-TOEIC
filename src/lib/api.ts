const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${path}: ${text}`);
  }
  return res.json();
}

import type {
  AdherentUser,
  DashboardData,
  ProgrammeStep,
  ScoreData,
  Note,
  Resource,
  Message,
  ChatMessage,
  CoachContext,
} from "./types";

export const api = {
  // Auth / Session
  getMe(): Promise<AdherentUser> {
    return fetchApi("/adherent/me");
  },

  // Dashboard
  getDashboard(): Promise<DashboardData> {
    return fetchApi("/adherent/dashboard");
  },

  // Programme
  getProgramme(): Promise<ProgrammeStep[]> {
    return fetchApi("/adherent/programme");
  },

  // Scores
  getScores(): Promise<ScoreData> {
    return fetchApi("/adherent/scores");
  },

  addScore(data: { listening: number; reading: number; format: string }): Promise<ScoreData> {
    return fetchApi("/adherent/scores", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Notes
  getNotes(): Promise<Note[]> {
    return fetchApi("/adherent/notes");
  },

  createNote(data: Pick<Note, "title" | "etape" | "content" | "words" | "tag">): Promise<Note> {
    return fetchApi("/adherent/notes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateNote(id: string, data: Partial<Note>): Promise<Note> {
    return fetchApi(`/adherent/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteNote(id: string): Promise<void> {
    return fetchApi(`/adherent/notes/${id}`, { method: "DELETE" });
  },

  // Ressources
  getRessources(): Promise<Resource[]> {
    return fetchApi("/adherent/ressources");
  },

  // Messages / Support
  getMessages(): Promise<Message[]> {
    return fetchApi("/adherent/messages");
  },

  sendMessage(content: string): Promise<Message> {
    return fetchApi("/adherent/messages", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },

  markMessageRead(id: string): Promise<void> {
    return fetchApi(`/adherent/messages/${id}/read`, { method: "PUT" });
  },

  // Coach IA
  getCoachContext(): Promise<CoachContext> {
    return fetchApi("/adherent/coach-ia/context");
  },

  getChatHistory(): Promise<ChatMessage[]> {
    return fetchApi("/adherent/coach-ia/history");
  },

  sendChatMessage(content: string): Promise<ChatMessage> {
    return fetchApi("/adherent/coach-ia/chat", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
};
