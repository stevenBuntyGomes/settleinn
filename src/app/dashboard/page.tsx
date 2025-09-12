// app/dashboard/page.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Title from "@/components/Title";
import { assets } from "@/assets/assets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchHotelDashboard,
  selectDashboardData,
  selectDashboardError,
  selectDashboardStatus,
} from "@/features/dashboard/dashboardSlice";
import { fetchMyHotels, selectMyHotels } from "@/features/hotels/hotelsSlice";
import {
  fetchOwnerRooms,
  selectRooms,
  selectRoomsStatus,
  selectRoomsError,
} from "@/features/rooms/roomsSlice";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  // KPI metrics
  const status = useAppSelector(selectDashboardStatus);
  const data = useAppSelector(selectDashboardData);
  const error = useAppSelector(selectDashboardError);

  // Hotels & Rooms
  const myHotels = useAppSelector(selectMyHotels);
  const rooms = useAppSelector(selectRooms);
  const roomsStatus = useAppSelector(selectRoomsStatus);
  const roomsError = useAppSelector(selectRoomsError);

  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";

  // Load KPIs + owner hotels + owner rooms
  useEffect(() => {
    if (status === "idle") dispatch(fetchHotelDashboard());
    dispatch(fetchMyHotels());
    dispatch(fetchOwnerRooms());
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "failed" && error) toast.error(error);
  }, [status, error]);

  useEffect(() => {
    if (roomsError) toast.error(roomsError);
  }, [roomsError]);

  const totalBookings = data?.totalBookings ?? 0;
  const totalRevenue = data?.totalRevenue ?? 0;
  const bookings = data?.bookings ?? [];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Title
          align="left"
          font="outfit"
          title="Dashboard"
          subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
        />

        {/* Quick Actions */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link
            href="/add-hotel"
            className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 hover:bg-gray-900"
          >
            + Add Hotel
          </Link>

          <Link
            href="/owner/add-room"
            className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 hover:bg-gray-900"
          >
            + Add Room
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="flex gap-4 my-8 flex-wrap">
          <div className="bg-rose-50/60 ring-1 ring-rose-100 rounded flex p-4 pr-8 items-center min-w-[260px]">
            <img className="max-sm:hidden h-10" src={assets.totalBookingIcon} alt="Total Bookings" />
            <div className="flex flex-col sm:ml-4 font-medium">
              <p className="text-rose-600 text-lg">Total Bookings</p>
              <p className="text-neutral-700 text-base">
                {status === "loading" ? "…" : totalBookings}
              </p>
            </div>
          </div>

          <div className="bg-rose-50/60 ring-1 ring-rose-100 rounded flex p-4 pr-8 items-center min-w-[260px]">
            <img className="max-sm:hidden h-10" src={assets.totalRevenueIcon} alt="Total Revenue" />
            <div className="flex flex-col sm:ml-4 font-medium">
              <p className="text-rose-600 text-lg">Total Revenue</p>
              <p className="text-neutral-700 text-base">
                {status === "loading" ? "…" : (
                  <>
                    {currency} {totalRevenue}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>

        <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
                <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Room Name</th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">Total Amount</th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">Payment Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {status === "loading" && (
                <tr>
                  <td className="py-4 px-4 text-gray-500" colSpan={4}>
                    Loading…
                  </td>
                </tr>
              )}

              {status !== "loading" && bookings.length === 0 && (
                <tr>
                  <td className="py-4 px-4 text-gray-500" colSpan={4}>
                    No recent bookings.
                  </td>
                </tr>
              )}

              {bookings.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item?.user?.username ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden">
                    {item?.room?.roomType ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-400 border-t border-gray-300 text-center">
                    {currency} {item?.totalPrice ?? 0}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-300">
                    <button
                      className={`py-1 px-3 text-xs rounded-full mx-auto block ${
                        item?.isPaid ? "bg-green-200 text-green-700" : "bg-amber-200 text-yellow-700"
                      }`}
                    >
                      {item?.isPaid ? "Completed" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* My Hotels */}
        <h2 className="text-xl text-blue-950/70 font-medium mt-10 mb-3">My Hotels</h2>
        <div className="w-full max-w-3xl border border-gray-200 rounded-lg">
          {myHotels.length === 0 ? (
            <div className="p-4 text-sm text-gray-600">No hotels yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {myHotels.map((h) => (
                <li key={h._id} className="p-4">
                  <div className="font-medium">{h.name}</div>
                  <div className="text-sm text-gray-600">
                    {h.address} — {h.city} • {h.contact}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* My Rooms (across all my hotels) */}
        <h2 className="text-xl text-blue-950/70 font-medium mt-10 mb-3">My Rooms</h2>
        <div className="w-full max-w-3xl border border-gray-200 rounded-lg">
          {roomsStatus === "loading" ? (
            <div className="p-4 text-sm text-gray-600">Loading rooms…</div>
          ) : rooms.length === 0 ? (
            <div className="p-4 text-sm text-gray-600">No rooms yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {rooms.map((r) => (
                <li key={r._id} className="p-4">
                  <div className="font-medium">
                    {r.roomType} • {currency} {r.pricePerNight}/night
                  </div>
                  <div className="text-sm text-gray-600">
                    Hotel: {typeof r.hotel === "string" ? r.hotel : r.hotel?.name} •{" "}
                    {r.isAvailable ? "Available" : "Unavailable"}
                  </div>
                  {r.amenities?.length ? (
                    <div className="mt-1 text-xs text-gray-500">
                      Amenities: {r.amenities.join(", ")}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
