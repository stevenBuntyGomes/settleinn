"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assets, cities } from "@/assets/assets";
import { apiFetch } from "@/features/rooms/api";

type Cities = string[];

/** Top-left brand logo */
function BrandLogo() {
  return (
    <img
      src="https://drive.google.com/thumbnail?id=1Uio7fAiJr9u8yOCp1YfngKQ4rvkXCT0I&sz=w320"
      onError={(e) => {
        e.currentTarget.src =
          "https://lh3.googleusercontent.com/d/1Uio7fAiJr9u8yOCp1YfngKQ4rvkXCT0I=w320";
      }}
      alt="SettleInn"
      className="block h-10 sm:h-11 w-auto origin-left scale-[4.5] sm:scale-[4.7]"
      referrerPolicy="no-referrer"
      draggable={false}
      loading="eager"
      decoding="async"
    />
  );
}

function pushRecentCityLocal(city: string) {
  try {
    const key = "recentSearchedCities";
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    const list: string[] = raw ? JSON.parse(raw) : [];
    const lower = city.trim().toLowerCase();
    const deduped = list.filter((c) => c.toLowerCase() !== lower);
    deduped.push(city);
    const capped = deduped.slice(-3);
    window.localStorage.setItem(key, JSON.stringify(capped));
  } catch {}
}

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState<string>("");

  const onSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Guard
      const dest = destination.trim();
      if (!dest) return;

      // ✅ Navigate to the listing page with a safe query string
      const qs = new URLSearchParams({ destination: dest }).toString();
      router.push(`/rooms?${qs}`);

      // ✅ Fire-and-forget: store recent search through your API (rewritten by next.config.mjs)
      apiFetch("/api/user/store-recent-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recentSearchedCity: dest }),
      }).catch(() => {});

      // Optional local cache for UX
      pushRecentCityLocal(dest);
    },
    [destination, router]
  );

  useEffect(() => {}, []);

  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-black bg-[url("/heroImage.png")] bg-no-repeat bg-cover bg-center h-[85vh] md:h-screen rounded-3xl bg-rose-50/60 py-16 sm:py-20'>
      {/* Top-left logo */}
      <div className="absolute left-5 top-5">
        <BrandLogo />
      </div>

      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-8 md:mt-20">Short Stay</p>

      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>

      <p className="max-w-130 mt-2 text-sm md:text-base text-black">
        Unparalleled luxury and comfort await at Downtown of Sudbury
      </p>

      <form
        onSubmit={onSearch}
        className="bg-white text-black rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto shadow-sm"
      >
        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="destinationInput" className="text-black">Destination</label>
          </div>
          <input
            list="destinations"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none text-black placeholder:text-black/50"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {(cities as Cities).map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        {/* Check-in */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkIn" className="text-black">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none text-black"
          />
        </div>

        {/* Check-out */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkOut" className="text-black">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none text-black"
          />
        </div>

        {/* Guests */}
        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests" className="text-black">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16 text-black placeholder:text-black/50"
            placeholder="0"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-md bg-white text-black border border-gray-300 py-3 px-4 my-auto cursor-pointer max-md:w-full max-md:py-1 hover:bg-gray-50"
        >
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
