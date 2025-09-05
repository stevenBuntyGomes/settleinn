"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

const DATA: Testimonial[] = [
  {
    quote:
      "Running our SettleInn video on Facebook and Instagram not only increased awareness, we also made 4× our usual online sales.",
    name: "Matt Cavallaro",
    title: "Founder, Nest Homeware",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote:
      "The creative templates helped us launch campaigns in hours instead of weeks. Performance and ROI both improved.",
    name: "Ava Nguyen",
    title: "Marketing Lead, Lumio",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote:
      "Beautiful results with almost no learning curve. Our team finally ships polished videos consistently.",
    name: "Noah Patel",
    title: "Growth Manager, Acorn",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
  },
];

export default function TestimonialsSlider() {
  const [idx, setIdx] = useState(0);
  const len = DATA.length;

  // autoplay (pause on hover)
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    start();
    return stop;
  }, [idx]);

  const start = () => {
    stop();
    timerRef.current = window.setTimeout(() => {
      setIdx((i) => (i + 1) % len);
    }, 5500);
  };
  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const go = (n: number) => setIdx((n + len) % len);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);

  return (
    <section id="testimonials-slider" className="relative bg-rose-50/70 ring-1 ring-rose-100 py-16 sm:py-20"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] tracking-[0.2em] font-semibold text-gray-500">
            TESTIMONIALS
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            What customers are saying
          </h2>
        </div>

        {/* Slider viewport */}
        <div className="relative mt-10 sm:mt-12">
          <div 
            ref={containerRef} 
            className="overflow-x-hidden" 
            aria-roledescription="carousel"
        >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {DATA.map((t, i) => (
                <Slide key={i} t={t} />
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white shadow-lg ring-1 ring-gray-200 hover:bg-rose-600 hover:text-white transition-colors"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white shadow-lg ring-1 ring-gray-200 hover:bg-rose-600 hover:text-white transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

function Slide({ t }: { t: Testimonial }) {
  return (
    <div className="min-w-full px-2">
      <figure className="relative mx-auto max-w-3xl">
        {/* Card */}
        <div className="rounded-[28px] bg-white ring-1 ring-gray-200 px-6 sm:px-10 pt-20 pb-14 sm:pt-24 sm:pb-16 text-center shadow-sm">
          {/* avatar + rose blob */}
          <div className="relative mx-auto -mt-10 mb-4 h-16 w-16">
            <div className="absolute -left-2 -top-1 h-8 w-8 rounded-[14px] rotate-12 bg-rose-400" />
            <img
              src={t.avatar}
              alt={t.name}
              className="relative h-16 w-16 rounded-full object-cover ring-2 ring-white shadow"
            />
          </div>

          <blockquote className="text-base sm:text-lg text-gray-900 leading-relaxed">
            {t.quote}
          </blockquote>

          <figcaption className="mt-5">
            <div className="font-semibold text-gray-900">{t.name}</div>
            <div className="mt-0.5 text-[11px] tracking-wide text-gray-500">
              {t.title.toUpperCase()}
            </div>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}
