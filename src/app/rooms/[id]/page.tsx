// app/rooms/[id]/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StarRating from "@/components/StarRating";

import { assets, facilityIcons, roomCommonData } from "@/assets/assets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRooms, selectRooms } from "@/features/rooms/roomsSlice";
import { apiFetch } from "@/features/rooms/api";

// Checkout slice bits
import {
  createCheckoutSession,
  selectCheckoutStatus,
  selectCheckoutError,
} from "@/features/checkout/checkoutSlice";

// Stripe.js (publishable key)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

/* Local types (kept light) */
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

function isAfterOrEqual(a: string, b: string) {
  const da = new Date(a);
  const db = new Date(b);
  return da.getTime() >= db.getTime();
}

export default function RoomDetailsPage() {
  const params = useParams();
  const id = useMemo(
    () => (Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined)),
    [params]
  );

  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectRooms);
  const checkoutStatus = useAppSelector(selectCheckoutStatus);
  const checkoutError = useAppSelector(selectCheckoutError);

  const [room, setRoom] = useState<Room | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [rooms?.length, dispatch]);

  useEffect(() => {
    if (!id || !rooms?.length) return;
    const found = rooms.find((r) => r._id === id) as Room | undefined;
    if (found) {
      setRoom(found);
      setMainImage(found.images?.[0] ?? null);
    }
  }, [id, rooms]);

  useEffect(() => {
    if (checkoutError) toast.error(checkoutError);
  }, [checkoutError]);

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
      await checkAvailability();
    },
    [checkAvailability]
  );

  const handleCheckout = useCallback(async () => {
    try {
      if (!id) return;
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select Check-In and Check-Out first.");
        return;
      }
      if (isAfterOrEqual(checkInDate, checkOutDate)) {
        toast.error("Check-In Date should be less than Check-Out Date");
        return;
      }
      if (!isAvailable) {
        toast.error("Please check availability first.");
        return;
      }

      const action = await dispatch(
        createCheckoutSession({
          roomId: id,
          checkInDate,
          checkOutDate,
          guests,
        })
      );

      if (createCheckoutSession.fulfilled.match(action)) {
        const { url, id: sessionId } = action.payload || {};
        // Prefer Stripe-hosted URL if provided
        if (url) {
          window.location.href = url;
          return;
        }
        // Else fallback to redirectToCheckout with sessionId
        if (sessionId) {
          const stripe = await stripePromise;
          if (!stripe) {
            toast.error("Stripe is not initialized");
            return;
          }
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) toast.error(error.message || "Stripe redirection failed");
          return;
        }
        toast.error("No checkout session returned.");
      } else {
        const err = action.payload as string;
        toast.error(err || "Failed to start checkout");
      }
    } catch (e: any) {
      toast.error(e?.message || "Failed to start checkout");
    }
  }, [dispatch, id, checkInDate, checkOutDate, guests, isAvailable]);

  const ownerImg = room?.hotel?.owner?.image || assets.userIcon;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />

      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {!room ? (
          <div className="max-w-5xl">
            <div className="h-8 w-64 bg-gray-100 rounded mb-4" />
            <div className="h-4 w-40 bg-gray-100 rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-72 bg-gray-100 rounded-xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gray-100 rounded-xl" />
                <div className="h-32 bg-gray-100 rounded-xl" />
                <div className="h-32 bg-gray-100 rounded-xl" />
                <div className="h-32 bg-gray-100 rounded-xl" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
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

            {/* Images */}
            <div className="flex flex-col lg:flex-row mt-6 gap-6">
              <div className="lg:w-1/2 w-full">
                {mainImage ? (
                  <img className="w-full rounded-3xl shadow-lg object-cover" src={mainImage} alt="Room" />
                ) : (
                  <div className="w-full aspect-[16/10] rounded-3xl shadow-lg bg-gray-100" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                {(room.images || []).map((image, idx) => (
                  <img
                    key={`${image}-${idx}`}
                    onClick={() => setMainImage(image)}
                    className={`w-full rounded-2xl shadow-md object-cover cursor-pointer ${
                      mainImage === image ? "ring-4 ring-rose-300" : "ring-0"
                    }`}
                    src={image}
                    alt={`Room ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-col md:flex-row md:justify-between mt-10">
              <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h2>

                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {(room.amenities || []).map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50/60 ring-1 ring-rose-100"
                    >
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

            {/* Availability Form */}
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.12)] p-6 rounded-3xl mx-auto mt-16 max-w-6xl"
            >
              <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-600">
                <div className="flex flex-col">
                  <label htmlFor="checkInDate" className="font-medium">Check-In</label>
                  <input
                    onChange={(e) => setCheckInDate(e.target.value)}
                    id="checkInDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                    required
                  />
                </div>

                <div className="w-px h-15 bg-gray-300/70 max-md:hidden" />

                <div className="flex flex-col">
                  <label htmlFor="checkOutDate" className="font-medium">Check-Out</label>
                  <input
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    id="checkOutDate"
                    type="date"
                    min={checkInDate || undefined}
                    disabled={!checkInDate}
                    className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                    required
                  />
                </div>

                <div className="w-px h-15 bg-gray-300/70 max-md:hidden" />

                <div className="flex flex-col">
                  <label htmlFor="guests" className="font-medium">Guests</label>
                  <input
                    onChange={(e) => setGuests(Number(e.target.value))}
                    value={guests}
                    id="guests"
                    type="number"
                    min={1}
                    className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white rounded-xl max-md:w-full max-md:mt-6 md:px-10 py-3 md:py-3.5 text-base cursor-pointer"
              >
                {isAvailable ? "Re-check Availability" : "Check Availability"}
              </button>
            </form>

            {/* Specs */}
            <div className="mt-20 space-y-4">
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

            {/* Checkout */}
            <div className="flex flex-col items-start gap-4 mt-12">
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

              <button
                onClick={handleCheckout}
                className="px-6 py-2.5 mt-4 rounded text-white bg-black hover:bg-gray-900 transition-all cursor-pointer disabled:opacity-60"
                disabled={checkoutStatus === "loading"}
              >
                {checkoutStatus === "loading" ? "Redirecting…" : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
