import { createFileRoute } from "@tanstack/react-router";

import { authors } from "@/data/club";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Authors — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Meet the novelists, poets, and essayists who join Aurevane for evenings of reading and conversation.",
      },
      { property: "og:title", content: "Authors — Aurevane Book Club" },
      {
        property: "og:description",
        content: "The writers who join Aurevane for evenings of reading and conversation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthorsPage,
});

function AuthorsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:pt-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        In the chair
      </p>
      <h1 className="max-w-[18ch] text-balance font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
        The writers at our table.
      </h1>
      <p className="mt-8 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
        Each season, a handful of authors join us — not to lecture, but to sit
        in the same circle and hear what their readers actually thought.
      </p>

      <div className="mt-16 space-y-20">
        {authors.map((author, i) => (
          <article
            key={author.name}
            className="grid items-center gap-10 lg:grid-cols-12"
          >
            <div
              className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <img
                src={author.portrait}
                alt={`Portrait of ${author.name}`}
                width={768}
                height={1024}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-3xl object-cover outline-1 -outline-offset-1 outline-foreground/5"
              />
            </div>
            <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                {author.role}
              </p>
              <h2 className="text-balance font-serif text-4xl font-medium leading-[1.05] text-foreground md:text-5xl">
                {author.name}
              </h2>
              <p className="mt-6 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
                {author.bio}
              </p>
              <p className="mt-6 font-sans text-sm text-foreground">
                <span className="text-muted-foreground">Reading with us: </span>
                <span className="font-serif text-lg italic">{author.book}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
