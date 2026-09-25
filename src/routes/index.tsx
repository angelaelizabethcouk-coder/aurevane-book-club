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
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-primary px-6 py-20 text-primary-foreground md:min-h-[760px] lg:px-8">
        <img
          src={heroChair}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="animate-rise max-w-4xl text-center md:mx-auto">
            <div className="mb-7 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              AUREVANE BOOK CLUB
            </div>
            <h1 className="text-balance font-serif text-6xl leading-[0.98] text-primary-foreground md:text-8xl">
              Where Great Books Meet Engaged Readers
            </h1>
            <p className="mx-auto mt-8 max-w-[52ch] whitespace-pre-line text-pretty font-sans text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Discover inspiring books, connect with passionate readers, and give your story the opportunity to reach new audiences.

              Join Aurevane Book Club — a welcoming community where authors and readers come together through meaningful conversations, fresh perspectives, and unforgettable stories.

              Read. Connect. Discover.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="bg-primary-foreground px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Join the Club
              </Link>
              <a
                href="#books"
                className="inline-flex items-center justify-center border border-primary-foreground/50 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:border-accent hover:text-accent"
              >
                This month's list <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section id="books" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-16 flex items-end justify-between border-b border-primary/20 pb-5">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                (a) This Season
              </p>
              <h2 className="text-balance font-serif text-5xl italic text-primary md:text-6xl">
                On the shelf
              </h2>
            </div>
            <Link
              to="/books"
              className="hidden border-b border-primary font-sans text-xs font-medium uppercase tracking-[0.14em] text-primary transition-colors hover:border-accent hover:text-accent sm:inline"
            >
              Full catalogue →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book, i) => (
              <article
                key={book.title}
                className={`group animate-rise p-4 ${i % 2 === 0 ? "bg-card" : "bg-secondary/55"} ${i % 2 === 1 ? "lg:mt-16" : ""}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="overflow-hidden ring-1 ring-border transition-transform duration-500 group-hover:-translate-y-1.5">
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
      <section id="events" className="bg-primary px-6 py-24 text-primary-foreground lg:px-8">
        <div className="mx-auto max-w-7xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          (b) Gatherings
        </p>
        <h2 className="mb-12 text-balance font-serif text-5xl text-primary-foreground md:text-6xl">
          Upcoming discussions
        </h2>
        <ol className="divide-y divide-primary-foreground/20 border-y border-primary-foreground/20">
          {events.map((event, i) => (
            <li
              key={event.date}
              className="group animate-rise grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 py-6 sm:grid-cols-[110px_1fr_auto]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="font-mono text-sm text-accent">{event.date}</div>
              <div>
                <h3 className="font-serif text-2xl text-primary-foreground">{event.title}</h3>
                <p className="mt-1 font-sans text-sm text-primary-foreground/70">{event.detail}</p>
              </div>
              <Link
                to="/events"
                className="hidden font-sans text-sm text-primary-foreground opacity-0 transition-colors group-hover:text-accent group-hover:opacity-100 sm:inline"
              >
                Reserve →
              </Link>
            </li>
          ))}
        </ol>
        </div>
      </section>

      {/* AUTHOR SPOTLIGHT */}
      <section id="authors" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-12 lg:px-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <img
              src={authorHalloran}
              alt="Black and white portrait of novelist Marguerite Ellison Halloran in lamplight"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full border-[10px] border-accent/20 object-cover"
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
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
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
       <section id="join" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
         <div className="border border-primary/20 bg-secondary/35 px-8 py-20 text-center md:px-16">
           <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              Membership
            </p>
             <h2 className="text-balance font-serif text-4xl leading-[1.05] text-primary md:text-6xl">
              Let readers discover your book.
              <br />
              <span className="italic">We'll keep the light on.</span>
            </h2>
             <p className="mx-auto mt-6 max-w-[44ch] text-pretty font-sans text-lg text-muted-foreground">
              Twelve books, four gatherings, one standing reservation at the
              table. No streaks, no deadlines — just good reading.
            </p>
            <Link
              to="/contact"
               className="mt-9 inline-block bg-primary px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
