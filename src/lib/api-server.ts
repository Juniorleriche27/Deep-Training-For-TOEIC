import { createClient } from "./supabase/server";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function fetchApiServer<T>(path: string, init?: RequestInit): Promise<T> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const { headers: initHeaders, ...initRest } = init ?? {};
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(initHeaders as Record<string, string> | undefined),
    },
    ...initRest,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${path}: ${text}`);
  }
  return res.json();
}

import type { AdherentUser } from "./types";

export const apiServer = {
  getMe(): Promise<AdherentUser> {
    return fetchApiServer("/adherent/me");
  },
};
