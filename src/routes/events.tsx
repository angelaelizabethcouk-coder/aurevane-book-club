import { createFileRoute } from "@tanstack/react-router";

import live1 from "@/assets/live/live-1.jpg.asset.json";
import live2 from "@/assets/live/live-2.jpg.asset.json";
import live3 from "@/assets/live/live-3.jpg.asset.json";
import live4 from "@/assets/live/live-4.jpg.asset.json";
import live5 from "@/assets/live/live-5.jpg.asset.json";
import live6 from "@/assets/live/live-6.jpg.asset.json";
import live7 from "@/assets/live/live-7.jpg.asset.json";
import live8 from "@/assets/live/live-8.jpg.asset.json";

const gallery = [live4, live8, live1, live2, live3, live5, live6, live7];

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Live Events — Aurevane Book Club" },
      {
        name: "description",
        content:
          "Photos from Aurevane Book Club live sessions, where authors and readers meet online.",
      },
      { property: "og:title", content: "Live Events — Aurevane Book Club" },
      {
        property: "og:description",
        content: "Photos from our live online book club sessions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: live4.url },
      { name: "twitter:image", content: live4.url },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:pt-24">
      <h1 className="sr-only">Aurevane Book Club live events</h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {gallery.map((image, i) => (
          <figure
            key={image.url}
            className="animate-rise overflow-hidden rounded-2xl border border-border bg-card"
            style={{ animationDelay: `${Math.min(i, 5) * 80}ms` }}
          >
            <img
              src={image.url}
              alt="Aurevane Book Club live session"
              loading={i > 1 ? "lazy" : "eager"}
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </main>
  );
}
