import { Link, createFileRoute } from "@tanstack/react-router";

import { allEvents } from "@/data/club";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Upcoming Aurevane book discussions, author evenings, and online salons. Reserve a seat at the table.",
      },
      { property: "og:title", content: "Events — Aurevane Book Club" },
      {
        property: "og:description",
        content: "Upcoming discussions, author evenings, and online salons.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:pt-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        Gatherings
      </p>
      <h1 className="max-w-[18ch] text-balance font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
        The season's discussions.
      </h1>
      <p className="mt-8 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
        In the reading room, at the Bindery, or online by lamplight. Members
        reserve a seat; guests are welcome at every open salon.
      </p>

      <ol className="mt-16 divide-y divide-border border-y border-border">
        {allEvents.map((event, i) => (
          <li
            key={`${event.date}-${event.title}`}
            className="group animate-rise grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 py-7 sm:grid-cols-[110px_1fr_auto]"
            style={{ animationDelay: `${Math.min(i, 5) * 80}ms` }}
          >
            <div className="font-mono text-sm text-accent">{event.date}</div>
            <div>
              <h2 className="font-serif text-2xl text-foreground md:text-3xl">
                {event.title}
              </h2>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{event.detail}</p>
            </div>
            <Link
              to="/contact"
              className="hidden font-sans text-sm text-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:inline"
            >
              Reserve →
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-3xl bg-primary px-8 py-12 text-center text-primary-foreground md:px-16">
        <h2 className="text-balance font-serif text-3xl font-medium md:text-4xl">
          Not a member yet?
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-pretty font-sans text-primary-foreground/75">
          Your first gathering is on us. Come listen, stay for the argument.
        </p>
        <Link
          to="/contact"
          className="mt-7 inline-block rounded-full bg-accent px-7 py-3.5 font-sans text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Join the Club
        </Link>
      </div>
    </main>
  );
}
