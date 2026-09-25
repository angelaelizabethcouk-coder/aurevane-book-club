import { createFileRoute } from "@tanstack/react-router";

import { books } from "@/data/club";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Aurevane Book Club" },
      {
        name: "description",
        content:
          "The Aurevane catalogue: this season's reads and past selections, from coastal fiction to essays on reading itself.",
      },
      { property: "og:title", content: "Books — Aurevane Book Club" },
      {
        property: "og:description",
        content: "This season's reads and past selections from the Aurevane shelf.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-20 lg:px-8 lg:pt-28">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        The catalogue
      </p>
      <h1 className="max-w-[18ch] text-balance font-serif text-6xl leading-[1.02] text-primary md:text-7xl">
        Every book we've argued about, kindly.
      </h1>
      <p className="mt-8 max-w-[52ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
        The current season and the shelf behind it. Each title was chosen by
        member vote and survived at least one long evening of discussion.
      </p>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book, i) => (
          <article
            key={book.title}
            className={`group animate-rise p-4 ${i % 2 === 0 ? "bg-card" : "bg-secondary/55"} ${i % 2 === 1 ? "lg:mt-14" : ""}`}
            style={{ animationDelay: `${(i % 4) * 80}ms` }}
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
            <h2 className="mt-1 font-serif text-2xl leading-snug text-foreground">
              {book.title}
            </h2>
            <p className="mt-0.5 font-sans text-sm text-muted-foreground">{book.author}</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
              {book.note}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
