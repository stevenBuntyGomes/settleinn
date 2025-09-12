// components/RecommendedHotels.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import Title from "@/components/Title";
import HotelCard from "@/components/HotelCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRooms } from "@/features/rooms/roomsSlice";

type Room = {
  _id: string;
  hotel?: { city?: string };
  [key: string]: any;
};

export default function RecommendedHotels() {
  const dispatch = useAppDispatch();

  const rooms: Room[] = useAppSelector((s: any) => s.rooms?.rooms) ?? [];
  const roomsStatus: "idle" | "loading" | "succeeded" | "failed" =
    useAppSelector((s: any) => s.rooms?.status) ?? "idle";

  const searchedCities: string[] =
    useAppSelector((s: any) => s.user?.recentSearchedCities) ?? [];

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
  }, [roomsStatus, dispatch]);

  const recommended = useMemo(() => {
    if (!rooms.length || !searchedCities.length) return [];
    const set = new Set(searchedCities.map((c) => String(c)));
    return rooms.filter((room) => room?.hotel?.city && set.has(String(room.hotel.city)));
  }, [rooms, searchedCities]);

  if (!recommended.length) return null;

  return (
    <section className="px-6 md:px-8 lg:px-10 xl:px-12 py-14">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Title
          title="Recommended Hotels"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 md:mt-16">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id ?? `rec-${index}`} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
