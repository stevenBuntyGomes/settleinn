"use client";
import React from "react";

export default function CampaignPromo() {
  return (
    <section id="campaign-promo" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header from first image */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Support Newcomers to Sudbury
          </h2>
        </div>

        {/* Card styled like the slider */}
        <div className="mt-10 sm:mt-12">
          <div className="rounded-[28px] bg-rose-50/70 ring-1 ring-rose-100 px-6 sm:px-10 pt-14 pb-12 sm:pt-16 sm:pb-14 text-center shadow-sm">
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-900 leading-relaxed">
              <strong>Just $299.99</strong> helps welcome <strong>4 newcomer’s</strong> from
              Toronto Airport to Sudbury
            </p>

            <p className="mt-4 text-sm sm:text-base text-gray-600">
              How many lives are you touching today?
            </p>

            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-rose-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                Sponsor Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
