import React from "react";

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-rose-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            We Offer <span className="text-rose-600">Services</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We have been able to work on several innovative projects. This is how we contributed to the creation of final products.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-600">
                <rect x="3" y="3" width="14" height="18" rx="2" />
                <path d="M7 7h6M7 11h6M7 15h4" />
              </svg>
            </div>
            <h3 className="text-center text-lg font-semibold">Short Stays</h3>
            <p className="mt-3 text-center text-gray-600">
              The most recent techniques and technologies are being used to develop a mobile application. Our skilled team of mobile developers creates the greatest mobile apps with Flutter technology…
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-600">
                <rect x="2" y="4" width="20" height="14" rx="2" />
                <path d="M2 8h20" />
                <circle cx="8" cy="12" r="2" />
                <path d="M14 12h6" />
              </svg>
            </div>
            <h3 className="text-center text-lg font-semibold">Moving Services</h3>
            <p className="mt-3 text-center text-gray-600">
              Developing web-based software contributes to excellent user experiences. For maximum acceptance and conversion rates, our team specializes in creating, updating, and maintaining business and customer-facing web applications…
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-600">
                <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V22a2 2 0 01-4 0v-.07a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 013 17.71l.06-.06c.47-.47.6-1.17.33-1.77A1.65 1.65 0 002 14.5v-1a1.65 1.65 0 001.39-1.18c.27-.6.14-1.3-.33-1.77L3 10.5a2 2 0 012.83-2.83l.06.06c.47.47 1.17.6 1.77.33A1.65 1.65 0 0010.5 6h1a1.65 1.65 0 001.18-1.39c.27-.6.14-1.3-.33-1.77l-.06-.06A2 2 0 0116.29 1l.06.06c.47.47.6 1.17.33 1.77A1.65 1.65 0 0018 4.5V5c.62 0 1.2.25 1.61.66.41.41.66.99.66 1.61v.5c0 .62-.25 1.2-.66 1.61-.41.41-.99.66-1.61.66h-.5z" />
              </svg>
            </div>
            <h3 className="text-center text-lg font-semibold">Ride Sharing Services</h3>
            <p className="mt-3 text-center text-gray-600">
              Let’s develop a customized software program. Do you have a special need for your company? Together, we will create a unique software solution that meets your requirements and project objectives…
            </p>
          </div>
        </div>
      </div>

      {/* subtle circular decoration */}
      <div className="pointer-events-none absolute -right-24 top-24 hidden lg:block">
        <div className="h-64 w-64 rounded-full border-2 border-rose-100" />
      </div>
    </section>
  );
}
