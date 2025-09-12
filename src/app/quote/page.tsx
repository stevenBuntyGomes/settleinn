"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { submitQuote, resetQuoteState } from "@/features/quote/quoteSlice";
import type { QuotePayload } from "@/features/quote/types";

export default function QuotePage() {
  const dispatch = useAppDispatch();
  const { sending, success, error, lastId } = useAppSelector((s) => s.quote);

  const [form, setForm] = useState<QuotePayload>({
    service: "",
    seatsItems: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    details: "",
    fullName: "",
    email: "",
    phone: "",
    heardAbout: "Google search",
    consent: false,
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const missing = useMemo(() => {
    const problems: string[] = [];
    if (!form.service) problems.push("service");
    if (!form.fullName) problems.push("full name");
    if (!form.email) problems.push("email");
    if (!form.consent) problems.push("consent");
    return problems;
  }, [form]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setLocalError(null);
    if (success || error) dispatch(resetQuoteState());
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (missing.length) {
      setLocalError(
        `Please provide: ${missing.join(", ")}.`
      );
      return;
    }
    const action = await dispatch(submitQuote(form));
    if (submitQuote.fulfilled.match(action)) {
      setForm({
        service: "",
        seatsItems: "",
        pickup: "",
        dropoff: "",
        date: "",
        time: "",
        details: "",
        fullName: "",
        email: "",
        phone: "",
        heardAbout: "Google search",
        consent: false,
      });
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/#home" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <span className="text-xl">←</span> Back to SettleInn
        </Link>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">Request a Quote</h1>
        <p className="mt-2 text-sm text-gray-400">
          Tell us what you need. We’ll respond quickly with pricing &amp; availability.
        </p>

        <form onSubmit={onSubmit} className="mt-6 rounded-3xl bg-slate-900/70 ring-1 ring-slate-800 shadow-2xl p-5 sm:p-7">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-300">
                Service<span className="text-rose-500"> *</span>
              </label>
              <select
                name="service"
                value={form.service}
                onChange={onChange}
                required
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 text-gray-100 placeholder-gray-500"
              >
                <option value="" className="bg-slate-900">Select a service</option>
                <option className="bg-slate-900" value="Short Stay">Short Stay</option>
                <option className="bg-slate-900" value="Moving Service">Moving Service</option>
                <option className="bg-slate-900" value="Ride Sharing">Ride Sharing</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Seats / Items</label>
              <input
                name="seatsItems"
                value={form.seatsItems}
                onChange={onChange}
                placeholder="e.g. 2 people"
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Pickup / Departure</label>
              <input
                name="pickup"
                value={form.pickup}
                onChange={onChange}
                placeholder="Address or city"
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Drop-off / Destination</label>
              <input
                name="dropoff"
                value={form.dropoff}
                onChange={onChange}
                placeholder="Address or city"
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={onChange}
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={onChange}
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-sm text-gray-300">Special requests / Details</label>
              <textarea
                name="details"
                value={form.details}
                onChange={onChange}
                rows={4}
                placeholder="Strollers, pets, large luggage, stairs, language assistance, etc."
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">
                Full name<span className="text-rose-500"> *</span>
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                required
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">
                Email<span className="text-rose-500"> *</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+1 (___) ___-____"
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 placeholder-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">How did you hear about us?</label>
              <select
                name="heardAbout"
                value={form.heardAbout}
                onChange={onChange}
                className="w-full rounded-xl bg-transparent ring-1 ring-slate-700 focus:ring-2 focus:ring-rose-500 px-3 py-2 text-gray-100"
              >
                <option className="bg-slate-900" value="Google search">Google search</option>
                <option className="bg-slate-900" value="Instagram">Instagram</option>
                <option className="bg-slate-900" value="Friend / Referral">Friend / Referral</option>
                <option className="bg-slate-900" value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={onChange}
              required
              className="mt-1 h-4 w-4 rounded border-slate-600 text-rose-600 focus:ring-rose-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-300">
              I agree to be contacted by SettleInn regarding this request. <span className="text-rose-500">*</span>
            </label>
          </div>

          {/* Client validation + server errors */}
          {localError && (
            <div className="mt-4 rounded-lg bg-rose-900/30 ring-1 ring-rose-800 px-3 py-2 text-sm text-rose-200">
              {localError}
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-lg bg-rose-900/30 ring-1 ring-rose-800 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-lg bg-emerald-900/30 ring-1 ring-emerald-800 px-3 py-2 text-sm text-emerald-200">
              Request sent! {lastId ? <>Reference ID: <span className="font-semibold">{lastId}</span></> : null}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <Link href="/#home" className="text-sm text-gray-300 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center rounded-full bg-rose-600 px-5 py-2.5 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
