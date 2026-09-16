import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  display_name: string;
  avatar_url: string | null;
};

export type Proposal = {
  id: string;
  title: string;
  book_title: string | null;
  message: string;
  status: string;
  created_at: string;
};

export type Thread = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  created_at: string;
};

export type Reply = {
  id: string;
  thread_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

export async function fetchProfiles(ids: string[]): Promise<Record<string, Profile>> {
  const unique = Array.from(new Set(ids));
  if (unique.length === 0) return {};
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url")
    .in("id", unique);
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((p) => [p.id, p as Profile]));
}

const signedCache = new Map<string, string>();

export async function signedAvatarUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  const cached = signedCache.get(path);
  if (cached) return cached;
  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(path, 60 * 60);
  if (error || !data?.signedUrl) return null;
  signedCache.set(path, data.signedUrl);
  return data.signedUrl;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
