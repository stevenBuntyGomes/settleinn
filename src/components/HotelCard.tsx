// components/HotelCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { assets } from "@/assets/assets";

type Room = {
  _id: string;
  images?: string[];
  hotel?: {
    name?: string;
    address?: string;
    city?: string;
  };
  pricePerNight?: number;
  [key: string]: any;
};

type HotelCardProps = {
  room: Room;
  index: number;
};

export default function HotelCard({ room, index }: HotelCardProps) {
  const currency =
    useAppSelector((s: any) => s.config?.currency) ??
    process.env.NEXT_PUBLIC_CURRENCY ??
    "$";

  const imgSrc = room?.images?.[0];

  return (
    <Link
      href={`/rooms/${room._id}`}
      onClick={() => {
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label={`Open ${room?.hotel?.name ?? "hotel"} details`}
      className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      {imgSrc ? (
        <img src={imgSrc} alt="hotel-img" draggable={false} className="w-full h-auto" />
      ) : (
        <div className="w-full aspect-[16/10] bg-gray-100" />
      )}

      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
          Best Seller
        </p>
      )}

      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room?.hotel?.name ?? "Hotel"}
          </p>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" className="h-4 w-4" /> 4.5
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <img src={assets.locationIcon} alt="location-icon" className="h-4 w-4" />
          <span>{room?.hotel?.address ?? "Address unavailable"}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl text-gray-800">
              {currency}
              {room?.pricePerNight ?? "--"}
            </span>
            /night
          </p>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
}
