import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Member Sign In — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Sign in to your Aurevane Book Club membership to see your proposals and join member discussions.",
      },
      { property: "og:title", content: "Member Sign In — Aurevane Book Club" },
      {
        property: "og:description",
        content: "Sign in to see your proposals and discussion threads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/members", replace: true });
  }, [loading, session, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName.trim() || email.split("@")[0] },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setSent(true);
          return;
        }
        navigate({ to: "/members", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/members", replace: true });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-2 w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-accent";

  return (
    <main className="mx-auto max-w-lg px-6 pb-28 pt-20 lg:pt-28">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        Members
      </p>
      <h1 className="font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
        {mode === "signin" ? "Sign in to your seat." : "Take a seat at the table."}
      </h1>

      {sent ? (
        <div className="mt-8 border border-primary/25 bg-card p-7">
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            Check your inbox — we've sent a confirmation link to{" "}
            <span className="text-foreground">{email}</span>. Click it to finish
            joining, then come back and sign in.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-5 border border-primary/25 bg-card p-7 shadow-[10px_10px_0_var(--color-secondary)]">
          {mode === "signup" && (
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Your name
              </span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
                className={inputClass}
                placeholder="Ada Lovelace"
              />
            </label>
          )}
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className={inputClass}
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary px-6 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
          >
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create my membership"}
          </button>
        </form>
      )}

      <p className="mt-6 font-sans text-sm text-muted-foreground">
        {mode === "signin" ? "New to Aurevane? " : "Already a member? "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setSent(false);
          }}
          className="text-primary underline decoration-accent underline-offset-4 hover:text-accent"
        >
          {mode === "signin" ? "Create a membership" : "Sign in instead"}
        </button>
      </p>
      <p className="mt-2 font-sans text-sm text-muted-foreground">
        <Link to="/contact" className="underline underline-offset-4">
          Questions? Write to us
        </Link>
      </p>
    </main>
  );
}
