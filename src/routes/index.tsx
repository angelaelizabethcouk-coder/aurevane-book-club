import { Link, createFileRoute } from "@tanstack/react-router";

import heroChair from "@/assets/hero-chair.jpg";
import authorHalloran from "@/assets/author-halloran.jpg";
import { events, featuredBooks, testimonials } from "@/data/club";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurevane Book Club — A private table for slow readers" },
      {
        name: "description",
        content:
          "Twelve novelists a year, one armchair, and conversations that last long after the final page. Join Aurevane Book Club.",
      },
      { property: "og:title", content: "Aurevane Book Club" },
      {
        property: "og:description",
        content: "A private table for slow readers. Est. 2019, by lamplight.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="animate-rise lg:col-span-7">
            <div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              <span>Vol. VII</span>
              <span className="h-px w-10 bg-accent/50" />
              <span>Est. 2019</span>
            </div>
            <h1 className="text-balance font-serif text-[clamp(2.75rem,6.5vw,5.25rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
              A slow reading,
              <br />
              <span className="italic">kept in good company.</span>
            </h1>
            <p className="mt-8 max-w-[46ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
              Twelve novelists a year, one armchair, and conversations that last
              long after the final page. Aurevane is a private table for people
              who read slowly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-medium text-primary-foreground shadow-sm ring-1 ring-primary transition-transform hover:-translate-y-0.5"
              >
                Join the Club
              </Link>
              <a
                href="#books"
                className="inline-flex items-center gap-2 font-sans text-sm text-foreground transition-colors hover:text-accent"
              >
                This month's list <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="absolute -left-6 -top-6 h-full w-full -rotate-2 rounded-3xl bg-accent-soft/40" />
            <img
              src={heroChair}
              alt="A stack of well-worn hardback novels resting on a leather armchair beside old letters"
              width={1024}
              height={1280}
              className="animate-rise relative aspect-[4/5] w-full rounded-3xl object-cover outline-1 -outline-offset-1 outline-foreground/5 [animation-delay:120ms]"
            />
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section id="books" className="border-t border-border bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                (a) This Season
              </p>
              <h2 className="text-balance font-serif text-4xl font-medium text-foreground md:text-5xl">
                On the shelf
              </h2>
            </div>
            <Link
              to="/books"
              className="hidden font-sans text-sm text-foreground transition-colors hover:text-accent sm:inline"
            >
              Full catalogue →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {featuredBooks.map((book, i) => (
              <article
                key={book.title}
                className="group animate-rise"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="overflow-hidden rounded-xl ring-1 ring-border transition-transform duration-300 group-hover:-translate-y-1.5">
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title} by ${book.author}`}
                    width={672}
                    height={992}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {book.month} · {book.genre}
                </p>
                <h3 className="mt-1 font-serif text-xl text-foreground">{book.title}</h3>
                <p className="mt-0.5 font-sans text-sm text-muted-foreground">{book.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          (b) Gatherings
        </p>
        <h2 className="mb-12 text-balance font-serif text-4xl font-medium text-foreground md:text-5xl">
          Upcoming discussions
        </h2>
        <ol className="divide-y divide-border border-y border-border">
          {events.map((event, i) => (
            <li
              key={event.date}
              className="group animate-rise grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 py-6 sm:grid-cols-[110px_1fr_auto]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="font-mono text-sm text-accent">{event.date}</div>
              <div>
                <h3 className="font-serif text-2xl text-foreground">{event.title}</h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">{event.detail}</p>
              </div>
              <Link
                to="/events"
                className="hidden font-sans text-sm text-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:inline"
              >
                Reserve →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* AUTHOR SPOTLIGHT */}
      <section id="authors" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <img
              src={authorHalloran}
              alt="Black and white portrait of novelist Marguerite Ellison Halloran in lamplight"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover outline-1 -outline-offset-1 outline-foreground/10"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              (c) In the chair
            </p>
            <h2 className="text-balance font-serif text-5xl font-medium leading-[1] md:text-6xl">
              Marguerite
              <br />
              Ellison Halloran
            </h2>
            <p className="mt-6 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-primary-foreground/75">
              Halloran writes the slow life in long sentences. On the 14th she
              joins us to talk memory, weather, and the novels she never
              finished reading.
            </p>
            <Link
              to="/authors"
              className="mt-8 inline-flex items-center gap-2 border-b border-accent/60 pb-1 font-sans text-sm text-primary-foreground transition-all hover:gap-3"
            >
              Meet our authors →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-12 text-center font-mono text-xs uppercase tracking-[0.22em] text-accent">
          (d) From the table
        </p>
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="animate-rise"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="text-pretty font-serif text-2xl italic leading-snug text-foreground">
                "{t.quote}"
              </p>
              <figcaption className="mt-5 font-sans text-sm text-muted-foreground">
                {t.name} · {t.since}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section id="join" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff 0 1px,transparent 1px 14px)",
            }}
          />
          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              Membership
            </p>
            <h2 className="text-balance font-serif text-4xl font-medium leading-[1.05] md:text-6xl">
              Pull up a chair.
              <br />
              <span className="italic">We'll keep the light on.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[44ch] text-pretty font-sans text-lg text-primary-foreground/75">
              Twelve books, four gatherings, one standing reservation at the
              table. No streaks, no deadlines — just good reading.
            </p>
            <Link
              to="/contact"
              className="mt-9 inline-block rounded-full bg-accent px-8 py-4 font-sans text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
