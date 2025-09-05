/* === TemplatesSliderSection.tsx (or paste inside your page) === */
import React from "react";

export default function TemplatesSliderSection() {
  // Swap these two image URLs later; the component will loop them automatically.
  const TOP_IMAGE =
    "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1400&auto=format&fit=crop";
  const BOTTOM_IMAGE =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop";

  // Build rows from a single image each, then duplicate for seamless loop
  const buildRow = (src: string) =>
    Array.from({ length: 8 }, (_, i) => ({ id: `${i}`, src }));

  const topRow = buildRow(TOP_IMAGE);
  const bottomRow = buildRow(BOTTOM_IMAGE);

  return (
    <section id="templates" className="relative py-16 sm:py-20 bg-rose-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + Button (rose, not yellow) */}
        <div className="text-center">
          <p className="text-[11px] tracking-[0.2em] font-semibold text-gray-500">
            TEMPLATES
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Get started with free product video templates
          </h2>
          <div className="mt-5">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-rose-600 px-5 py-2.5 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              Explore all templates
            </a>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-10 sm:mt-12">
          {/* Masked edges for a clean marquee look */}
          <div className="relative rounded-3xl bg-white p-4 sm:p-6 ring-1 ring-gray-200">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />


            {/* Top row → slides RIGHT */}
            <div className="group overflow-hidden">
              <div
                className="marquee-right flex gap-6 will-change-transform"
                style={{ animationDuration: "32s" }}
              >
                {[...topRow, ...topRow].map((it, i) => (
                  <TemplateCard key={`top-${i}`} src={it.src} />
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div className="h-6" />

            {/* Bottom row → slides LEFT */}
            <div className="group overflow-hidden">
              <div
                className="marquee-left flex gap-6 will-change-transform"
                style={{ animationDuration: "28s" }}
              >
                {[...bottomRow, ...bottomRow].map((it, i) => (
                  <TemplateCard key={`bot-${i}`} src={it.src} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local styles: marquee + pause on hover */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee-left {
          animation: marquee-left linear infinite;
        }
        .marquee-right {
          animation: marquee-right linear infinite;
        }
        /* Pause when hovering either row */
        .group:hover .marquee-left,
        .group:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function TemplateCard({ src }: { src: string }) {
  return (
    <figure className="relative w-[330px] sm:w-[360px] md:w-[400px] h-[200px] sm:h-[220px] md:h-[240px] shrink-0">
      {/* Card */}
      <div className="h-full w-full overflow-hidden rounded-3xl ring-1 ring-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-full w-full">
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* Rose badge (brand color instead of yellow) */}
          <div className="absolute left-4 top-4 rounded-xl bg-rose-50 ring-1 ring-rose-200 px-3 py-1 text-rose-600 text-[11px] font-semibold">
            Use Template
          </div>
        </div>
      </div>
    </figure>
  );
}
