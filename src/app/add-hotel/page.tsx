"use client";

import React, { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createHotel,
  fetchMyHotels,
  selectMyHotels,
  selectHotelsCreating,
  selectHotelsLoading,
  selectHotelsError,
  resetHotelError,
} from "@/features/hotels/hotelsSlice";
import { toast } from "react-hot-toast";

export default function AddHotelPage() {
  const dispatch = useAppDispatch();
  const myHotels = useAppSelector(selectMyHotels);
  const creating = useAppSelector(selectHotelsCreating);
  const loading = useAppSelector(selectHotelsLoading);
  const error = useAppSelector(selectHotelsError);

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    city: "",
  });

  useEffect(() => {
    dispatch(fetchMyHotels());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetHotelError());
    }
  }, [error, dispatch]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.contact || !form.city) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await dispatch(createHotel(form));
    if (createHotel.fulfilled.match(result)) {
      toast.success(result.payload?.message || "Hotel registered");
      setForm({ name: "", address: "", contact: "", city: "" });
    } else if (createHotel.rejected.match(result)) {
      toast.error((result.payload as string) || "Failed to register hotel");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold">Manage Your Hotels</h1>
        <p className="text-gray-600 mt-1">
          You can register multiple hotels on the same account.
        </p>

        {/* Existing hotels */}
        <div className="mt-6">
          {loading ? (
            <div className="text-gray-600">Loading your hotels…</div>
          ) : myHotels.length === 0 ? (
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <p className="font-medium">You haven’t registered any hotels yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {myHotels.map((h) => (
                <div
                  key={h._id}
                  className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm"
                >
                  <p className="font-semibold">{h.name}</p>
                  <div className="mt-1 text-sm text-gray-700 space-y-0.5">
                    <p><span className="font-medium">Address:</span> {h.address}</p>
                    <p><span className="font-medium">City:</span> {h.city}</p>
                    <p><span className="font-medium">Contact:</span> {h.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add new hotel */}
        <h2 className="text-xl font-semibold mt-10">Register a New Hotel</h2>
        <form onSubmit={onSubmit} className="mt-4 space-y-5 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Urbanza Suites"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
              value={form.address}
              onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
                value={form.city}
                onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                placeholder="Sudbury"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
                value={form.contact}
                onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))}
                placeholder="+1 555 111 2222"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center justify-center rounded-md bg-black text-white px-5 py-2.5 hover:bg-gray-900 disabled:opacity-60"
          >
            {creating ? "Registering…" : "Register Hotel"}
          </button>
        </form>
      </section>
    </main>
  );
}
