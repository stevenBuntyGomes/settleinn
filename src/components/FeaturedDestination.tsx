"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";
import HotelCard from "@/components/HotelCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRooms } from "@/features/rooms/roomsSlice";

export default function FeaturedDestination() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const rooms = useAppSelector((s) => s.rooms.rooms);
  const status = useAppSelector((s) => s.rooms.status);

  // fetch on first mount if idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [status, dispatch]);

  if (!rooms?.length) return null;

  const handleViewAll = () => {
    router.push("/rooms");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="px-6 md:px-8 lg:px-10 xl:px-12 py-14">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Title
          title="Featured Destination"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 md:mt-16">
          {rooms.slice(0, 4).map((room: any, index: number) => (
            <HotelCard key={room._id ?? `feat-${index}`} room={room} index={index} />
          ))}
        </div>

        <button
          onClick={handleViewAll}
          className="my-12 md:my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
          View All Destinations
        </button>
      </div>
    </section>
  );
}
