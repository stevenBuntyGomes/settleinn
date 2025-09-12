"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Title from "@/components/Title";
import HotelCard from "@/components/HotelCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRooms, selectRooms } from "@/features/rooms/roomsSlice";

export default function RoomsIndexPage() {
  const params = useSearchParams();
  const destination = (params.get("destination") || "").trim();

  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectRooms);
  const status = useAppSelector((s) => s.rooms.status);

  useEffect(() => {
    if (status === "idle") dispatch(fetchRooms());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    if (!destination) return rooms;
    const q = destination.toLowerCase();
    return rooms.filter((r) => r?.hotel?.city?.toLowerCase().includes(q));
  }, [rooms, destination]);

  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12 bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <Title
          title={destination ? `Rooms in ${destination}` : "All Rooms"}
          subTitle={destination ? `Results for "${destination}"` : "Browse all available rooms"}
        />
        {status === "loading" && <p className="mt-8 text-gray-600">Loading rooms…</p>}
        {status !== "loading" && filtered.length === 0 && (
          <p className="mt-8 text-gray-600">No rooms found.</p>
        )}
        <div className="flex flex-wrap gap-6 mt-8">
          {filtered.map((room, index) => (
            <HotelCard key={room._id ?? `room-${index}`} room={room} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
