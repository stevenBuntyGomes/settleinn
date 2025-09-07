"use client";
import React from "react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-rose-50/60 ring-1 ring-rose-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Info */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Get <span className="text-rose-600">In Touch</span>
            </h2>
            <p className="mt-4 max-w-lg text-gray-700">
              SettleInn your trusted partner for a fresh start!
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-rose-50 ring-1 ring-rose-100 text-rose-600 shadow-sm">
                  {/* map pin */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Visit:</div>
                  <div className="text-gray-700">
                    124 Cedar St Greater Sudbury, ON P3E 3L6
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-rose-50 ring-1 ring-rose-100 text-rose-600 shadow-sm">
                  {/* mail */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Mail:</div>
                  <div className="text-gray-700">contact@settleinn.app</div>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-rose-50 ring-1 ring-rose-100 text-rose-600 shadow-sm">
                  {/* phone */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.49a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" />
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Phone:</div>
                  <div className="text-gray-700">+1 (249) 360-0777</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Drop us a line</h3>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-lg border-2 border-rose-300 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                className="w-full rounded-lg border-2 border-rose-300 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                className="w-full rounded-lg border-2 border-rose-300 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}