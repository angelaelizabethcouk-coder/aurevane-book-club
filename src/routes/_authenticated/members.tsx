import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { MemberAvatar } from "@/components/MemberAvatar";
import { formatDate, type Profile, type Proposal } from "@/lib/members";

export const Route = createFileRoute("/_authenticated/members")({
  head: () => ({
    meta: [
      { title: "My Reading Room — Aurevane Book Club" },
      {
        name: "description",
        content: "Your Aurevane membership: your profile and the proposals you've sent us.",
      },
      { property: "og:title", content: "My Reading Room — Aurevane Book Club" },
      {
        property: "og:description",
        content: "Your profile and your submitted proposals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembersPage,
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center font-sans text-muted-foreground">
      We couldn't load your reading room. Please refresh and try again.
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center font-sans text-muted-foreground">
      Nothing here.
    </main>
  ),
});

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-primary";

function MembersPage() {
  const { user } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");

  const profileQuery = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      return (
        (data as Profile | null) ?? {
          id: user.id,
          display_name: user.email?.split("@")[0] ?? "Reader",
          avatar_url: null,
        }
      );
    },
  });

  useEffect(() => {
    if (profileQuery.data) setName(profileQuery.data.display_name);
  }, [profileQuery.data]);

  const proposalsQuery = useQuery({
    queryKey: ["proposals", user.id],
    queryFn: async (): Promise<Proposal[]> => {
      const { data, error } = await supabase
        .from("proposals")
        .select("id, title, book_title, message, status, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Proposal[];
    },
  });

  const saveProfile = useMutation({
    mutationFn: async (patch: { display_name?: string; avatar_url?: string }) => {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, display_name: name.trim() || "Reader", ...patch });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      toast.success("Profile saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadAvatar = useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: user.id, display_name: name.trim() || "Reader", avatar_url: path });
      if (profileError) throw profileError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      toast.success("Photo updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [title, setTitle] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [message, setMessage] = useState("");

  const addProposal = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("proposals").insert({
        author_id: user.id,
        title: title.trim(),
        book_title: bookTitle.trim() || null,
        message: message.trim(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitle("");
      setBookTitle("");
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["proposals", user.id] });
      toast.success("Proposal sent");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeProposal = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("proposals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proposals", user.id] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const profile = profileQuery.data;

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 lg:pt-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        Members only
      </p>
      <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
        Your reading room.
      </h1>
      <p className="mt-5 max-w-[52ch] font-sans text-muted-foreground">
        Your profile, the proposals you've sent us, and the door to member
        discussions.
      </p>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-5">
          <MemberAvatar
            name={profile?.display_name ?? "Reader"}
            path={profile?.avatar_url ?? null}
            size={72}
          />
          <div className="min-w-[220px] flex-1">
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Display name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveProfile.mutate({})}
            disabled={saveProfile.isPending}
            className="rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            Save profile
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadAvatar.isPending}
            className="rounded-full px-5 py-2.5 font-sans text-sm font-medium text-primary ring-1 ring-primary/40 transition-colors hover:bg-accent-soft/40 disabled:opacity-60"
          >
            {uploadAvatar.isPending ? "Uploading…" : "Change photo"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAvatar.mutate(file);
              e.target.value = "";
            }}
          />
          <Link
            to="/threads"
            className="rounded-full px-5 py-2.5 font-sans text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-accent-soft/30"
          >
            Discussion threads →
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">
          Send a proposal
        </h2>
        <form
          className="mt-6 space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            addProposal.mutate();
          }}
        >
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Proposal title
            </span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="A quiet novel for the winter table"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Book title
            </span>
            <input
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Your proposal
            </span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            disabled={addProposal.isPending}
            className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {addProposal.isPending ? "Sending…" : "Send proposal"}
          </button>
        </form>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">
          Your proposals
        </h2>
        {proposalsQuery.isLoading ? (
          <p className="mt-6 font-sans text-sm text-muted-foreground">Loading…</p>
        ) : (proposalsQuery.data?.length ?? 0) === 0 ? (
          <p className="mt-6 font-sans text-sm text-muted-foreground">
            Nothing yet — your first proposal will appear here.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {proposalsQuery.data!.map((proposal) => (
              <li key={proposal.id} className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl text-foreground">{proposal.title}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {proposal.status} · {formatDate(proposal.created_at)}
                  </span>
                </div>
                {proposal.book_title && (
                  <p className="mt-1 font-sans text-sm italic text-muted-foreground">
                    {proposal.book_title}
                  </p>
                )}
                <p className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed text-muted-foreground">
                  {proposal.message}
                </p>
                <button
                  type="button"
                  onClick={() => removeProposal.mutate(proposal.id)}
                  className="mt-3 font-sans text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Withdraw
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
