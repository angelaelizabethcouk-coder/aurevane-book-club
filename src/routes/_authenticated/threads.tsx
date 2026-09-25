import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { MemberAvatar } from "@/components/MemberAvatar";
import {
  fetchProfiles,
  formatDate,
  type Profile,
  type Reply,
  type Thread,
} from "@/lib/members";

export const Route = createFileRoute("/_authenticated/threads")({
  head: () => ({
    meta: [
      { title: "Member Discussions — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Discussion threads for Aurevane members: start a conversation about a book and reply to fellow readers.",
      },
      { property: "og:title", content: "Member Discussions — Aurevane Book Club" },
      {
        property: "og:description",
        content: "Start a conversation and reply to fellow readers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThreadsPage,
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center font-sans text-muted-foreground">
      We couldn't load the discussions. Please refresh and try again.
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center font-sans text-muted-foreground">
      Nothing here.
    </main>
  ),
});

const inputClass =
  "mt-2 w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-accent";

function ThreadsPage() {
  const { user } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const threadsQuery = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const [threadsRes, repliesRes] = await Promise.all([
        supabase
          .from("threads")
          .select("id, author_id, title, body, created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("thread_replies")
          .select("id, thread_id, author_id, body, created_at")
          .order("created_at", { ascending: true }),
      ]);
      if (threadsRes.error) throw threadsRes.error;
      if (repliesRes.error) throw repliesRes.error;
      const threads = (threadsRes.data ?? []) as Thread[];
      const replies = (repliesRes.data ?? []) as Reply[];
      const profiles = await fetchProfiles([
        ...threads.map((t) => t.author_id),
        ...replies.map((r) => r.author_id),
      ]);
      return { threads, replies, profiles };
    },
  });

  const addThread = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("threads")
        .insert({ author_id: user.id, title: title.trim(), body: body.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitle("");
      setBody("");
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      toast.success("Thread started");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const addReply = useMutation({
    mutationFn: async ({ threadId, text }: { threadId: string; text: string }) => {
      const { error } = await supabase
        .from("thread_replies")
        .insert({ thread_id: threadId, author_id: user.id, body: text });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["threads"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const author = (id: string): Profile =>
    threadsQuery.data?.profiles[id] ?? {
      id,
      display_name: "Member",
      avatar_url: null,
    };

  return (
    <main className="mx-auto max-w-5xl px-6 pb-28 pt-20 lg:px-8 lg:pt-28">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        Members only
      </p>
      <h1 className="font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
        Discussion threads.
      </h1>

      <form
        className="mt-10 space-y-5 border border-primary/25 bg-card p-6 shadow-[10px_10px_0_var(--color-secondary)] md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          addThread.mutate();
        }}
      >
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Thread title
          </span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="On endings that refuse to explain themselves"
          />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Opening thought
          </span>
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={addThread.isPending}
          className="bg-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
        >
          {addThread.isPending ? "Posting…" : "Start the thread"}
        </button>
      </form>

      {threadsQuery.isLoading ? (
        <p className="mt-10 font-sans text-sm text-muted-foreground">Loading…</p>
      ) : (threadsQuery.data?.threads.length ?? 0) === 0 ? (
        <p className="mt-10 font-sans text-sm text-muted-foreground">
          No conversations yet. Start the first one.
        </p>
      ) : (
        <ul className="mt-12 space-y-8">
          {threadsQuery.data!.threads.map((thread) => {
            const threadAuthor = author(thread.author_id);
            const replies = threadsQuery.data!.replies.filter(
              (r) => r.thread_id === thread.id,
            );
            return (
              <li
                key={thread.id}
                className="border border-primary/25 bg-card p-6 md:p-8"
              >
                <div className="flex items-center gap-3">
                  <MemberAvatar
                    name={threadAuthor.display_name}
                    path={threadAuthor.avatar_url}
                  />
                  <div>
                    <p className="font-sans text-sm text-foreground">
                      {threadAuthor.display_name}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatDate(thread.created_at)}
                    </p>
                  </div>
                </div>
                <h2 className="mt-5 font-serif text-2xl text-foreground">
                  {thread.title}
                </h2>
                <p className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed text-muted-foreground">
                  {thread.body}
                </p>

                {replies.length > 0 && (
                  <ul className="mt-6 space-y-5 border-t border-border pt-6">
                    {replies.map((reply) => {
                      const replyAuthor = author(reply.author_id);
                      return (
                        <li key={reply.id} className="flex gap-3">
                          <MemberAvatar
                            name={replyAuthor.display_name}
                            path={replyAuthor.avatar_url}
                            size={32}
                          />
                          <div>
                            <p className="font-sans text-sm text-foreground">
                              {replyAuthor.display_name}
                              <span className="ml-2 font-mono text-xs text-muted-foreground">
                                {formatDate(reply.created_at)}
                              </span>
                            </p>
                            <p className="mt-1 whitespace-pre-line font-sans text-sm leading-relaxed text-muted-foreground">
                              {reply.body}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <ReplyForm
                  pending={addReply.isPending}
                  onSubmit={(text) => addReply.mutate({ threadId: thread.id, text })}
                />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

function ReplyForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");
  return (
    <form
      className="mt-6 flex flex-wrap items-end gap-3 border-t border-border pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit(text.trim());
        setText("");
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add to the conversation…"
         className="min-w-[220px] flex-1 border border-border bg-background px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
      <button
        type="submit"
        disabled={pending}
         className="px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary ring-1 ring-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
      >
        Reply
      </button>
    </form>
  );
}
