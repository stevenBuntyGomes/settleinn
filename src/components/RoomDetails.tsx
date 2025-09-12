"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StarRating from "@/components/StarRating";
import { assets, facilityIcons, roomCommonData } from "@/assets/assets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRooms, selectRooms } from "@/features/rooms/roomsSlice";
import { apiFetch } from "@/features/rooms/api";

/* ─────────────── Types ─────────────── */
type HotelOwner = { image?: string };
type Hotel = { name?: string; address?: string; city?: string; owner?: HotelOwner };
type Room = {
  _id: string;
  images: string[];
  amenities: string[];
  roomType?: string;
  pricePerNight?: number;
  hotel: Hotel;
};

/* Helper: compare YYYY-MM-DD strings safely */
function isAfterOrEqual(a: string, b: string) {
  // both are YYYY-MM-DD; convert to Date to be safe
  const da = new Date(a);
  const db = new Date(b);
  return da.getTime() >= db.getTime();
}

export default function RoomDetails() {
  const params = useParams();
  const router = useRouter();
  const id = useMemo(
    () => (Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined)),
    [params]
  );

  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectRooms);

  const [room, setRoom] = useState<Room | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  // Load rooms if not already present
  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [rooms?.length, dispatch]);

  // Find the room by id when rooms are loaded or id changes
  useEffect(() => {
    if (!id || !rooms?.length) return;
    const found = rooms.find((r) => r._id === id) as Room | undefined;
    if (found) {
      setRoom(found);
      setMainImage(found.images?.[0] ?? null);
    }
  }, [id, rooms]);

  const checkAvailability = useCallback(async () => {
    try {
      if (!id) return;
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select both Check-In and Check-Out dates.");
        return;
      }
      if (isAfterOrEqual(checkInDate, checkOutDate)) {
        toast.error("Check-In Date should be less than Check-Out Date");
        return;
      }

      const res = await apiFetch("/api/bookings/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: id, checkInDate, checkOutDate }),
      });

      const data = await res.json();
      if (data?.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available");
        }
      } else {
        toast.error(data?.message || "Failed to check availability");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to check availability");
    }
  }, [id, checkInDate, checkOutDate]);

  const onSubmitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!id) return;

      try {
        if (!isAvailable) {
          return checkAvailability();
        }

        // Attempt to create the booking (no Clerk header; backend should allow or return 401)
        const res = await apiFetch("/api/bookings/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          }),
        });

        const data = await res.json();

        if (data?.success) {
          toast.success(data.message || "Booking created successfully");
          router.push("/my-bookings");
          if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          // If your backend still requires auth, you may see 401 here
          toast.error(data?.message || "Failed to create booking");
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to create booking");
      }
    },
    [id, isAvailable, checkAvailability, checkInDate, checkOutDate, guests, router]
  );

  if (!room) return null;

  const ownerImg = room.hotel?.owner?.image || assets.userIcon;

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Room Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name || "Hotel"}{" "}
          <span className="font-inter text-sm">({room.roomType || "Room"})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <StarRating />
        <p className="ml-2">200+ reviews</p>
      </div>

      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel?.address || "Address unavailable"}</span>
      </div>

      {/* Room Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          {mainImage ? (
            <img
              className="w-full rounded-xl shadow-lg object-cover"
              src={mainImage}
              alt="Room Image"
            />
          ) : (
            <div className="w-full aspect-[16/10] rounded-xl shadow-lg bg-gray-100" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {(room.images || []).map((image, idx) => (
            <img
              key={`${image}-${idx}`}
              onClick={() => setMainImage(image)}
              className={[
                "w-full rounded-xl shadow-md object-cover cursor-pointer",
                mainImage === image ? "ring-4 ring-orange-500" : "ring-0",
              ].join(" ")}
              src={image}
              alt={`Room Image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Room Highlights */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-playfair">
            Experience Luxury Like Never Before
          </h1>

          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {(room.amenities || []).map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <img
                  src={facilityIcons[item as keyof typeof facilityIcons]}
                  alt={item}
                  className="w-5 h-5"
                />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl font-medium">${room.pricePerNight ?? "--"}/night</p>
      </div>

      {/* CheckIn CheckOut Form */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
      >
        <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">
              Check-In
            </label>
            <input
              onChange={(e) => setCheckInDate(e.target.value)}
              id="checkInDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              placeholder="Check-In"
              required
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 max-md:hidden" />

          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">
              Check-Out
            </label>
            <input
              onChange={(e) => setCheckOutDate(e.target.value)}
              id="checkOutDate"
              type="date"
              min={checkInDate || undefined}
              disabled={!checkInDate}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              placeholder="Check-Out"
              required
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 max-md:hidden" />

          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">
              Guests
            </label>
            <input
              onChange={(e) => setGuests(Number(e.target.value))}
              value={guests}
              id="guests"
              type="number"
              min={1}
              className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              placeholder="0"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
        >
          {isAvailable ? "Book Now" : "Check Availability"}
        </button>
      </form>

      {/* Common Specifications */}
      <div className="mt-25 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <img className="w-6.5" src={spec.icon} alt={`${spec.title}-icon`} />
            <div>
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to availability. You get a
          comfortable Two bedroom apartment has a true city feeling. The price quoted is for
          two guest, at the guest slot please mark the number of guests to get the exact price
          for groups. The Guests will be allocated ground floor according to availability. You
          get the comfortable two bedroom apartment that has a true city feeling.
        </p>
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <img className="h-14 w-14 md:h-18 md:w-18 rounded-full" src={ownerImg} alt="Host" />
          <div>
            <p className="text-lg md:text-xl">Hosted by {room.hotel?.name || "Host"}</p>
            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2">200+ reviews</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
          Contact Now
        </button>
      </div>
    </div>
  );
}
