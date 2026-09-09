import { Link } from "@tanstack/react-router";
import { useState } from "react";

const navItems = [
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/events", label: "Events" },
  { to: "/authors", label: "Authors" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-serif text-2xl tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          Aurevane <span className="text-accent">·</span>{" "}
          <span className="font-medium italic">Book Club</span>
        </Link>
        <nav className="hidden items-center gap-8 font-sans text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="rounded-full px-4 py-2 font-sans text-sm font-medium text-primary ring-1 ring-primary/40 transition-colors hover:bg-primary hover:text-background"
          >
            Join the Club
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full ring-1 ring-border md:hidden"
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
        <nav className="border-t border-border bg-background px-6 py-4 md:hidden">
          <ul className="space-y-3 font-sans text-sm text-muted-foreground">
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
          </ul>
        </nav>
      )}
    </header>
  );
}
