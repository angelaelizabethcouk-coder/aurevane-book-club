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
    <main>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pt-28">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          In the chair
        </p>
        <h1 className="max-w-[18ch] text-balance font-serif text-6xl leading-[1.02] text-primary md:text-7xl">
          The writers at our table.
        </h1>
        <p className="mt-8 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
          Each season, a handful of authors join us — not to lecture, but to sit
          in the same circle and hear what their readers actually thought.
        </p>
      </section>

      <div className="space-y-20 bg-primary px-6 py-24 text-primary-foreground lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
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
                className="aspect-[3/4] w-full border-[10px] border-accent/20 object-cover"
              />
            </div>
            <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                {author.role}
              </p>
              <h2 className="text-balance font-serif text-5xl leading-[1.05] text-primary-foreground md:text-6xl">
                {author.name}
              </h2>
              <p className="mt-6 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-primary-foreground/75">
                {author.bio}
              </p>
              <p className="mt-6 font-sans text-sm text-primary-foreground">
                <span className="text-primary-foreground/65">Reading with us: </span>
                <span className="font-serif text-lg italic">{author.book}</span>
              </p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </main>
  );
}
