import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

const navItems = [
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/authors", label: "Authors" },
  { to: "/events", label: "Live event" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    setOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }


  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          to="/"
          className="font-serif text-2xl uppercase text-primary transition-colors hover:text-accent"
          onClick={() => setOpen(false)}
        >
          Aurevane <span className="italic">Book Club</span>
        </Link>
        <nav className="hidden items-center gap-8 font-sans text-xs font-medium uppercase tracking-[0.14em] text-foreground lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                to="/members"
                className="hidden px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.12em] text-primary ring-1 ring-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground sm:inline-flex"
              >
                My reading room
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent sm:inline"
              >
                Member sign in
              </Link>
              <Link
                to="/contact"
                className="bg-primary px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Join the Club
              </Link>
            </>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center ring-1 ring-primary lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-foreground transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[5.5px] h-px w-full bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-[11px] h-px w-full bg-foreground transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-6 py-5 lg:hidden">
          <ul className="space-y-3 font-sans text-xs uppercase tracking-[0.14em] text-foreground">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-1 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {session ? (
              <>
                <li>
                  <Link
                    to="/members"
                    onClick={() => setOpen(false)}
                    className="block py-1 transition-colors hover:text-foreground"
                  >
                    My reading room
                  </Link>
                </li>
                <li>
                  <Link
                    to="/threads"
                    onClick={() => setOpen(false)}
                    className="block py-1 transition-colors hover:text-foreground"
                  >
                    Discussions
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="block py-1 transition-colors hover:text-foreground"
                >
                  Member sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
