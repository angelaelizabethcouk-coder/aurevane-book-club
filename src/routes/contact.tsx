import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Join — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Join Aurevane Book Club or write to us. Membership includes twelve books a year, four gatherings, and a standing seat at the table.",
      },
      { property: "og:title", content: "Contact & Join — Aurevane Book Club" },
      {
        property: "og:description",
        content: "Join the club or write to us — the kettle is always on.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-transparent px-4 py-3 font-sans text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-accent/60";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:pt-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
            Join the club
          </p>
          <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
            Let readers discover your book.
          </h1>
          <p className="mt-8 max-w-[48ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
            Join Our Book Club
          </p>
          <p className="mt-4 max-w-[48ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
            Make Your Book Visible to Readers.
          </p>
          <p className="mt-4 max-w-[48ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
            Connect your book with passionate readers, discover meaningful discussions, and create opportunities for genuine reader engagement. Our book club brings authors and readers together through stories worth talking about.
          </p>
          <p className="mt-4 max-w-[48ch] text-pretty font-sans text-lg leading-relaxed text-muted-foreground">
            Join us today and give your book the attention it deserves.
          </p>

          <dl className="mt-12 space-y-6 border-t border-border pt-10">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                The reading room
              </dt>
              <dd className="mt-1 font-sans text-sm text-foreground">
                14 Lantern Row, Bloomsbury, London
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                Contact us on
              </dt>
              <dd className="mt-1 font-sans text-sm text-foreground">
                marvelovellous@gmail.com
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                Always open
              </dt>
              <dd className="mt-1 font-sans text-sm text-foreground">
                Tuesday to Saturday, 10am until the lamps come on
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6">
          {sent ? (
            <div className="grid h-full min-h-[24rem] place-items-center rounded-3xl bg-primary p-10 text-center text-primary-foreground">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                  Letter received
                </p>
                <p className="mt-4 font-serif text-3xl font-medium italic">
                  We'll keep the light on for you.
                </p>
                <p className="mx-auto mt-4 max-w-[38ch] font-sans text-sm text-primary-foreground/75">
                  A welcome letter is on its way. Watch your inbox — and your
                  nightstand.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    Name
                  </span>
                  <input required type="text" placeholder="Your name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    Email
                  </span>
                  <input required type="email" placeholder="you@address.com" className={inputClass} />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  I'm writing to
                </span>
                <select className={inputClass} defaultValue="join">
                  <option value="join">Join the club</option>
                  <option value="event">Reserve a seat at a gathering</option>
                  <option value="question">Ask a question</option>
                </select>
              </label>
              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  Your letter
                </span>
                <textarea
                  required
                  rows={5}
                  placeholder="What was the last book that stayed with you?"
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-medium text-primary-foreground ring-1 ring-primary transition-transform hover:-translate-y-0.5"
              >
                Send the letter
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
