// components/ExclusiveOffers.tsx
"use client";

import React from "react";
import Title from "@/components/Title";
import { assets, exclusiveOffers } from "@/assets/assets";
import type { StaticImageData } from "next/image";

type Offer = {
  _id: string | number;
  image: string | StaticImageData;  // ← allow both
  priceOff: number;
  title: string;
  description: string;
  expiryDate: string;
};

export default function ExclusiveOffers() {
  const offers = (exclusiveOffers ?? []) as Offer[];
  if (!offers.length) return null;

  return (
    <section className="px-6 md:px-8 lg:px-10 xl:px-12 pt-14 pb-20 bg-rose-50/60 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <Title
            align="left"
            title="Exclusive Offers"
            subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          />
          <button type="button" className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
            View All Offers
            <img className="group-hover:translate-x-1 transition-transform" src={assets.arrowIcon} alt="arrow-icon" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((item) => {
            const bg =
              typeof item.image === "string" ? item.image : (item.image as StaticImageData).src; // ← get URL
            return (
              <div
                key={item._id}
                className="group relative flex flex-col items-start justify-between gap-1 h-72 md:h-80 px-4 pt-12 md:pt-18 rounded-xl text-white bg-no-repeat bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${bg})` } as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/25 transition-colors" />
                <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full z-10">
                  {item.priceOff}% OFF
                </p>
                <div className="relative z-10">
                  <p className="text-2xl font-medium font-playfair">{item.title}</p>
                  <p className="mt-1">{item.description}</p>
                  <p className="text-xs text-white/70 mt-3">Expires {item.expiryDate}</p>
                </div>
                <button type="button" className="relative z-10 flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                  View Offers
                  <img className="invert group-hover:translate-x-1 transition-transform" src={assets.arrowIcon} alt="arrow-icon" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
