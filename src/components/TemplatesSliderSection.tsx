/* === TemplatesSliderSection.tsx === */
"use client";
import React from "react";

/** Extract a Drive file ID from either a share URL or a raw ID */
function extractDriveId(input: string): string {
  // Matches /file/d/<id>/view?... or /uc?id=<id> or raw ids
  const dMatch = input.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
  if (dMatch?.[1]) return dMatch[1];
  const ucMatch = input.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (ucMatch?.[1]) return ucMatch[1];
  // If it's likely already an ID (lengthy base64-ish), accept it
  if (/^[a-zA-Z0-9_-]{10,}$/.test(input)) return input;
  throw new Error(`Invalid Google Drive link or id: ${input}`);
}

/** Build a fixed-length row by repeating IDs until reaching min length */
function buildRow(ids: string[], minLen = 8): string[] {
  const out: string[] = [];
  while (out.length < minLen) out.push(...ids);
  return out.slice(0, minLen);
}

/** A robust Google Drive image that mirrors your fallback snippet */
function DriveImage({
  id,
  widthParam = 1600, // request a generous width; card CSS controls display size
  alt = "",
  className = "",
}: {
  id: string;
  widthParam?: number;
  alt?: string;
  className?: string;
}) {
  const primary = `https://drive.google.com/thumbnail?id=${id}&sz=w${widthParam}`;
  const fallback = `https://lh3.googleusercontent.com/d/${id}=w${widthParam}`;
  return (
    <img
      src={primary}
      onError={(e) => {
        // Swap to lh3 if thumbnail endpoint fails
        (e.currentTarget as HTMLImageElement).src = fallback;
      }}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function TemplatesSliderSection() {
  // Your 6 Google Drive links
  const DRIVE_LINKS = [
    "https://drive.google.com/file/d/1t3rlSaR2iaMLBc1fR7cJz8MJ8FphZFcs/view?usp=drive_link",
    "https://drive.google.com/file/d/1MNJzlo5sj5VO8ImgmrL_SlxOAZqNl_xh/view?usp=drive_link",
    "https://drive.google.com/file/d/1yDsNpdWwGsXJrAeNioBLijkk0lEbLjxp/view?usp=drive_link",
    "https://drive.google.com/file/d/13X7xAsn8VJafHfxqkJ41t-x7V-3lrPTm/view?usp=drive_link",
    "https://drive.google.com/file/d/1Kr7UjPfD6qrufVA5usSlHmeR8YHeQngZ/view?usp=drive_link",
    "https://drive.google.com/file/d/1c0FxkYNu5YsZ8P8_lujahtt-2SRj4EVl/view?usp=drive_link",
  ];

  const driveIds = DRIVE_LINKS.map(extractDriveId);

  // Split across rows (1–3 top, 4–6 bottom), then repeat to 8 each
  const topIds = buildRow(driveIds.slice(0, 3), 8);
  const bottomIds = buildRow(driveIds.slice(3), 8);

  return (
    <section
      id="templates"
      className="relative py-16 sm:py-20 bg-rose-50/60 ring-1 ring-rose-100"
    >
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
        <div className="mt-10 sm:mt-12 rounded-xl overflow-hidden">
          {/* Masked edges for a clean marquee look */}
          <div className="relative rounded-3xl bg-white p-4 sm:p-6 ring-1 ring-gray-200">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

            {/* Top row → slides RIGHT (IDs 1–3 repeated to 8) */}
            <div className="group overflow-hidden " >
              <div
                className="marquee-right flex gap-6 will-change-transform"
                style={{ animationDuration: "32s" }}
              >
                {[...topIds, ...topIds].map((id, i) => (
                  <TemplateCard key={`top-${i}`} driveId={id} />
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div className="h-6" />

            {/* Bottom row → slides LEFT (IDs 4–6 repeated to 8) */}
            <div className="group overflow-hidden">
              <div
                className="marquee-left flex gap-6 will-change-transform"
                style={{ animationDuration: "28s" }}
              >
                {[...bottomIds, ...bottomIds].map((id, i) => (
                  <TemplateCard key={`bot-${i}`} driveId={id} />
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

function TemplateCard({ driveId }: { driveId: string }) {
  return (
    <figure className="relative w-[330px] sm:w-[360px] md:w-[400px] h-[200px] sm:h-[220px] md:h-[240px] shrink-0">
      {/* Card */}
      <div className="h-full w-full overflow-hidden rounded-3xl ring-1 ring-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-full w-full">
          <DriveImage
            id={driveId}
            widthParam={1600}
            alt=""
            className="h-full w-full object-cover"
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
