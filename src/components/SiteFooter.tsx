"use client";
import React from "react";

export default function SiteFooter() {
  return (
    <footer className="relative pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + social */}
          <div>
            <a href="#home" className="flex items-center font-extrabold tracking-tight text-2xl">
              <span className="text-gray-900">Settle</span>
              <span className="text-rose-600">inn</span>
            </a>

            <div className="mt-5 flex items-center gap-4 text-gray-600">
              <a aria-label="Facebook" href="#" className="hover:text-rose-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.21 10.44 22v-7.02H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.21 22 17.1 22 12.07z"/></svg>
              </a>
              <a aria-label="Instagram" href="#" className="hover:text-rose-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9.5A2.5 2.5 0 119.5 12 2.5 2.5 0 0112 9.5z"/></svg>
              </a>
              <a aria-label="Twitter" href="#" className="hover:text-rose-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92a8.2 8.2 0 01-2.36.65 4.1 4.1 0 001.8-2.27 8.2 8.2 0 01-2.6 1 4.1 4.1 0 00-7 3.74A11.63 11.63 0 013 4.9a4.1 4.1 0 001.27 5.47 4.07 4.07 0 01-1.86-.51v.05a4.1 4.1 0 003.29 4 4.1 4.1 0 01-1.85.07 4.1 4.1 0 003.83 2.84 8.24 8.24 0 01-6.08 1.7A11.64 11.64 0 009.29 21c7 0 10.86-5.79 10.86-10.81 0-.16 0-.33-.01-.49A7.7 7.7 0 0022 5.92z"/></svg>
              </a>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              About <span className="text-rose-600">Us</span>
            </h4>
            <p className="mt-4 text-sm leading-6">
              At <span className="font-semibold">SettleInn</span>, we simplify your move to a new
              city with tailored packages for a smooth transition. Whether for work, studies, or a fresh start,
              we offer reliable support—transportation, housing, and guidance.
            </p>
            <p className="mt-3 text-sm leading-6">
              Backed by trusted partners, we focus on comfort, convenience, and personalized service to help you feel at home.
            </p>
            <p className="mt-3 text-sm font-semibold">
              SettleInn your trusted partner for a fresh start!
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              <span className="text-rose-600">Support</span>
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-600">Help Center</a></li>
              <li><a href="#" className="hover:text-rose-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-600">DriveU Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-600">DriveU Terms of Service</a></li>
              <li><a href="#" className="hover:text-rose-600">DriveU Copyright &amp; Protection Policy</a></li>
              <li><a href="#" className="hover:text-rose-600">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              Contact <span className="text-rose-600">Us</span>
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Email: <a href="mailto:contact@settleinn.app" className="hover:text-rose-600">contact@settleinn.app</a></li>
              <li>Phone: <a href="tel:+12493600777" className="hover:text-rose-600">+1 (249) 360-0777</a></li>
              <li>Address: 124 Cedar St</li>
              <li>Greater Sudbury, ON P3E 3L6</li>
            </ul>

            <h5 className="mt-6 text-sm font-semibold text-gray-900">
              Supported <span className="text-rose-600">By</span>
            </h5>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {/* Replace with real badges */}
              <Badge>Innovation<br />Quarters</Badge>
              <Badge>Quartiers de<br />l’innovation</Badge>
              <Badge className="col-span-2">Proud Member of the<br />Chamber of Commerce</Badge>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-10 border-rose-100" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-600">© 2025–2026. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-rose-600">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-rose-600">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "grid place-items-center rounded-lg bg-white px-3 py-2 text-center text-[11px] leading-snug ring-1 ring-gray-200 shadow-sm " +
        className
      }
    >
      {children}
    </div>
  );
}
