// app/book_now/page.tsx
"use client";

import React from "react";
import Hero from "@/components/Hero";
import RecommendedHotels from "@/components/RecommendedHotels";
import FeaturedDestination from "@/components/FeaturedDestination";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import SiteHeader from "@/components/SiteHeader";

export default function BookNowPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl bg-white ring-1 ring-rose-100 shadow-sm">
          <Hero />
        </div>
      </section>

      {/* Recommended Hotels
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl bg-white ring-1 ring-rose-100 shadow-sm">
          <RecommendedHotels />
        </div>
      </section>

      {/* Featured Destination */}
      {/* <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl bg-white ring-1 ring-rose-100 shadow-sm">
          <FeaturedDestination />
        </div>
      </section> */}

      {/* Exclusive Offers */}
      {/* <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl bg-white ring-1 ring-rose-100 shadow-sm">
          <ExclusiveOffers />
        </div>
      </section>  */}

      {/* Testimonials */}
    </main>
  );
}
