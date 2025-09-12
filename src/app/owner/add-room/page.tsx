// app/dashboard/add-room/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import Title from "@/components/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createRoom, selectRoomsCreating } from "@/features/rooms/roomsSlice";
import { fetchMyHotels, selectMyHotels } from "@/features/hotels/hotelsSlice";
import type { Hotel } from "@/features/hotels/types";
import toast from "react-hot-toast";

type InputsState = {
  hotelId: string;
  roomType: string;
  pricePerNight: number | string;
  amenities: Record<
    "Free WiFi" | "Free Breakfast" | "Room Service" | "Mountain View" | "Pool Access",
    boolean
  >;
};

export default function AddRoomPage() {
  const dispatch = useAppDispatch();
  const creating = useAppSelector(selectRoomsCreating);
  const myHotels = useAppSelector(selectMyHotels);

  const [inputs, setInputs] = useState<InputsState>({
    hotelId: "",
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  useEffect(() => {
    dispatch(fetchMyHotels());
  }, [dispatch]);

  // default select first hotel when list loads
  useEffect(() => {
    if (myHotels.length && !inputs.hotelId) {
      setInputs((p) => ({ ...p, hotelId: myHotels[0]._id }));
    }
  }, [myHotels, inputs.hotelId]);

  const amenityKeys = useMemo(
    () => Object.keys(inputs.amenities) as (keyof InputsState["amenities"])[],
    [inputs.amenities]
  );

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.hotelId) {
      toast.error("Please select a hotel");
      return;
    }
    if (!inputs.roomType || !inputs.pricePerNight) {
      toast.error("Please fill in room type and price");
      return;
    }

    const amenitiesEnabled = amenityKeys.filter((k) => inputs.amenities[k]);

    try {
      const action = await dispatch(
        createRoom({
          hotelId: inputs.hotelId,
          roomType: inputs.roomType,
          pricePerNight: Number(inputs.pricePerNight),
          amenities: amenitiesEnabled,
        })
      );

      if (createRoom.fulfilled.match(action)) {
        toast.success(action.payload?.message || "Room added");
        // reset
        setInputs({
          hotelId: myHotels[0]?._id || "",
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
      } else {
        const err = action.payload as string;
        toast.error(err || "Failed to add room");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add room");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={onSubmitHandler}>
          <Title
            align="left"
            font="outfit"
            title="Add Room"
            subTitle="Fill in the details carefully—accurate room details, pricing, and amenities enhance the booking experience."
          />

          {/* Hotel picker */}
          <div className="mt-6 max-w-xl">
            <p className="text-gray-800">Hotel</p>
            {myHotels.length ? (
              <select
                className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
                value={inputs.hotelId}
                onChange={(e) => setInputs((p) => ({ ...p, hotelId: e.target.value }))}
              >
                {myHotels.map((h: Hotel) => (
                  <option key={h._id} value={h._id}>
                    {h.name} — {h.city}
                  </option>
                ))}
              </select>
            ) : (
              <div className="mt-1 text-sm text-gray-600">
                You haven’t registered any hotels yet.{" "}
                <a className="underline" href="/dashboard/add-hotel">
                  Register a hotel
                </a>{" "}
                to add rooms.
              </div>
            )}
          </div>

          <div className="w-full flex max-sm:flex-col sm:gap-4 mt-6">
            <div className="flex-1 max-w-48">
              <p className="text-gray-800">Room Type</p>
              <select
                className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
                value={inputs.roomType}
                onChange={(e) => setInputs((p) => ({ ...p, roomType: e.target.value }))}
              >
                <option value="">Select Room Type</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Family Suite">Family Suite</option>
              </select>
            </div>

            <div>
              <p className="text-gray-800">
                Price <span className="text-xs">/night</span>
              </p>
              <input
                type="number"
                placeholder="0"
                className="border border-gray-300 mt-1 rounded p-2 w-24"
                value={inputs.pricePerNight}
                onChange={(e) =>
                  setInputs((p) => ({ ...p, pricePerNight: Number(e.target.value) }))
                }
              />
            </div>
          </div>

          <p className="text-gray-800 mt-6">Amenities</p>
          <div className="flex flex-col flex-wrap mt-1 text-gray-600 max-w-sm">
            {amenityKeys.map((amenity, index) => {
              const checked = inputs.amenities[amenity];
              return (
                <label key={index} className="flex items-center gap-2 py-0.5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setInputs((p) => ({
                        ...p,
                        amenities: { ...p.amenities, [amenity]: !checked },
                      }))
                    }
                  />
                  <span>{amenity}</span>
                </label>
              );
            })}
          </div>

          <button
            className="bg-black text-white px-8 py-2 rounded mt-8 cursor-pointer disabled:opacity-70 hover:bg-gray-900"
            disabled={creating || !myHotels.length}
            type="submit"
          >
            {creating ? "Adding..." : "Add Room"}
          </button>
        </form>
      </section>
    </main>
  );
}
