"use client";
import React from "react";

export default function DriveUDownloadSection() {
  return (
    <section
      id="driveu-apps"
      className="relative py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            <span className="block">Need a Ride? Or Want to Become a Driver?</span>
            <span className="block mt-1">Download Our Apps</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-gray-700">
            Driven by Community. Powered by People. SettleInn DriveU connects neighbors,
            newcomers, and travelers with safe, trusted rides and meaningful driver opportunities.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Rideshare */}
          <AppCard
            title="SettleInn DriveU Rideshare"
            shots={[
              "https://images.unsplash.com/photo-1551816230-ef5deaed4a36?w=300&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=300&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1483721310020-03333e577078?w=300&q=80&auto=format&fit=crop",
            ]}
          />

          {/* Driver */}
          <AppCard
            title="SettleInn DriveU Driver"
            shots={[
              "https://images.unsplash.com/photo-1548365328-9f547fb0953c?w=300&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=300&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505238680356-667803448bb6?w=300&q=80&auto=format&fit=crop",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function AppCard({ title, shots }: { title: string; shots: string[] }) {
  return (
    <div className="rounded-2xl bg-rose-50/60 ring-1 ring-rose-100 shadow-sm p-6 sm:p-7">
      <h3 className="text-center text-[15px] font-semibold text-gray-900">{title}</h3>

      {/* Screens strip */}
      <div className="mt-5 flex items-end justify-center gap-3 sm:gap-4">
        {shots.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-28 sm:h-32 w-auto rounded-[10px] ring-1 ring-gray-200 object-cover"
            draggable={false}
          />
        ))}
      </div>

      {/* Store badges */}
      <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
        <StoreBadge type="apple" href="#" />
        <StoreBadge type="google" href="#" />
      </div>
    </div>
  );
}

function StoreBadge({ type, href }: { type: "apple" | "google"; href: string }) {
  const isApple = type === "apple";
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-700"
    >
      {isApple ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.365 1.43c.04 1.104-.402 2.174-1.186 2.954-.812.806-1.79 1.27-2.89 1.2-.05-1.08.44-2.19 1.21-2.98.8-.81 2.08-1.39 2.87-1.17zM20.5 17.1c-.33.76-.73 1.47-1.2 2.12-.64.88-1.17 1.49-1.59 1.83-.62.57-1.29.86-2 .87-.51.01-1.08-.15-1.77-.46-.69-.3-1.33-.45-1.91-.46-.61 0-1.28.15-2.01.46-.73.3-1.31.46-1.73.47-.69.03-1.36-.27-2.01-.9-.43-.38-.98-1.01-1.64-1.87-.7-.92-1.28-1.98-1.73-3.17-.49-1.3-.74-2.56-.74-3.79 0-1.4.3-2.61.9-3.64.47-.8 1.09-1.42 1.85-1.87.76-.44 1.58-.67 2.46-.68.48 0 1.1.17 1.86.5.76.33 1.25.5 1.48.5.18 0 .72-.21 1.65-.62.89-.38 1.65-.54 2.26-.49 1.67.14 2.93.79 3.78 1.96-1.5.91-2.24 2.19-2.23 3.86.01 1.29.48 2.37 1.41 3.21.42.4.89.7 1.42.91-.11.31-.23.61-.37.9z" />
          </svg>
          <span className="text-[10px] leading-3">Download on the</span>
          <span className="text-sm font-semibold -ml-1">App Store</span>
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 4.27v15.46c0 .62.67 1.01 1.21.7l9.23-5.36-2.43-2.43L3 4.27zM20.3 10.86L17.4 9.19l-3 3 3 3 2.9-1.67c.9-.52.9-1.82 0-2.66zM13.77 8.6l-1.85 1.85 2.43 2.43 1.85-1.85-2.43-2.43z" />
          </svg>
          <span className="text-[10px] leading-3">GET IT ON</span>
          <span className="text-sm font-semibold -ml-1">Google Play</span>
        </>
      )}
    </a>
  );
}
