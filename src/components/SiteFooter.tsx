import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl tracking-tight text-foreground">
            Aurevane <span className="text-accent">·</span>{" "}
            <span className="font-medium italic">Book Club</span>
          </p>
          <p className="mt-4 max-w-[38ch] text-pretty font-sans text-sm text-muted-foreground">
            A private table for slow readers. Est. 2019, by lamplight.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            Explore
          </p>
          <ul className="space-y-2.5 font-sans text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/books" className="transition-colors hover:text-foreground">
                Books
              </Link>
            </li>
            <li>
              <Link to="/events" className="transition-colors hover:text-foreground">
                Events
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            More
          </p>
          <ul className="space-y-2.5 font-sans text-sm text-muted-foreground">
            <li>
              <Link to="/authors" className="transition-colors hover:text-foreground">
                Authors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Join
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            The letter
          </p>
          <p className="mb-3 font-sans text-sm text-muted-foreground">
            One note a month, with the list.
          </p>
          {subscribed ? (
            <p className="font-serif text-lg italic text-foreground">
              Lovely — the next letter will find you.
            </p>
          ) : (
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="you@address.com"
                className="min-w-0 flex-1 rounded-l-full border border-border bg-transparent px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-accent/60"
              />
              <button
                type="submit"
                className="rounded-r-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-6 font-mono text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Aurevane Book Club</span>
          <span>Set in Cormorant &amp; Inter</span>
        </div>
      </div>
    </footer>
  );
}
