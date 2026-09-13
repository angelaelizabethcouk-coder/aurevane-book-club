import { Link, createFileRoute } from "@tanstack/react-router";

import heroChair from "@/assets/hero-chair.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Founded in 2019, Aurevane is a private reading society for people who read slowly: twelve books a year, four gatherings, and one long conversation.",
      },
      { property: "og:title", content: "About — Aurevane Book Club" },
      {
        property: "og:description",
        content: "A private reading society for people who read slowly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    mark: "I",
    title: "Read slowly",
    body: "One book a month, never more. We would rather know twelve books deeply than skim fifty.",
  },
  {
    mark: "II",
    title: "Talk generously",
    body: "Every voice at the table gets the room it needs. Disagreement is welcome; dismissal is not.",
  },
  {
    mark: "III",
    title: "Keep the light on",
    body: "Miss a month and your seat is still yours. Life happens; the club waits.",
  },
];

function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 lg:pt-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          About the club
        </p>
        <h1 className="max-w-[16ch] text-balance font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
          A library that remembers your name.
        </h1>
        <p className="mt-8 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
          About Our Book Club

          We are a community of passionate readers and authors brought together by a shared love of great books.

          Our goal is to help make books more visible to the right readers while creating a welcoming space for meaningful discussions, authentic feedback, and lasting connections.

          Whether you’re an author looking to introduce your book to engaged readers or a reader searching for your next great story, our club is a place to discover, connect, read, and share.

          Join our community and let your story reach more readers.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={heroChair}
              alt="Hardback novels and old letters on a worn leather armchair in warm lamplight"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover outline-1 -outline-offset-1 outline-foreground/5"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              Three house rules
            </h2>
            <ol className="mt-8 divide-y divide-border border-y border-border">
              {principles.map((p) => (
                <li key={p.mark} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="font-serif text-2xl italic text-accent">{p.mark}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">{p.title}</h3>
                    <p className="mt-1 max-w-[48ch] font-sans text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-3">
          {[
            { value: "2019", label: "Founded by lamplight" },
            { value: "84", label: "Books read together" },
            { value: "300+", label: "Members at the table" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-5xl font-medium text-foreground">{stat.value}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-balance font-serif text-4xl font-medium text-foreground md:text-5xl">
          The table has a seat for you.
        </h2>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-sans text-sm font-medium text-primary-foreground ring-1 ring-primary transition-transform hover:-translate-y-0.5"
        >
          Join the Club
        </Link>
      </section>
    </main>
  );
}
