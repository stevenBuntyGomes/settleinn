"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

// Small helper for smooth in-page scroll
function useScrollSpy(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds.join(",")]);

  return active;
}

function NavLink({ href, children, onClick, active }: { href: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        // enable smooth scroll to anchors
        if (href?.startsWith("#")) {
          e.preventDefault();
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        onClick?.();
      }}
      className={`px-3 py-2 text-[15px] transition-colors ${
        active ? "text-rose-600" : "text-gray-700 hover:text-rose-600"
      }`}
    >
      {children}
    </a>
  );
}

export default function LandingPage() {
  const sections = ["home", "services"]; // two sections only as requested
  const active = useScrollSpy(sections);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // close popouts on escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Sticky Navigation (Site01 style; pill Contact Us; dropdown for Our Services) */}
      <header className="sticky top-0 z-50">
        <div className="backdrop-blur bg-white/80 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo like ROOTDEVS. */}
              <a href="#home" className="flex items-center font-extrabold tracking-tight text-xl">
                <span className="text-rose-600">Sattle</span>
                <span className="text-gray-900">In</span>

              </a>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                <NavLink href="#home" active={active === "home"}>About Us</NavLink>
                <NavLink href="#case-studies">Case Studies</NavLink>

                <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
                  <button
                    className={`px-3 py-2 text-[15px] flex items-center gap-1 transition-colors ${
                      servicesOpen ? "text-rose-600" : "text-gray-700 hover:text-rose-600"
                    }`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onClick={() => setServicesOpen((s) => !s)}
                  >
                    Our Services
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="mt-[1px]">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-0 mt-1 w-56 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                      <a
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                          setServicesOpen(false);
                        }}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        Rental Service
                      </a>
                      <a
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                          setServicesOpen(false);
                        }}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        Moving Service
                      </a>
                      <a
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                          setServicesOpen(false);
                        }}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        Ride Sharing
                      </a>
                    </div>
                  )}
                </div>

                <NavLink href="#how-we-work">How We Work</NavLink>
                <NavLink href="#career">Career</NavLink>

                <a
                  href="#contact"
                  className="ml-2 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75zm2.34.75l7.41 5.19a.75.75 0 00.9 0l7.41-5.19H4.59z" />
                  </svg>
                  Contact Us
                </a>
              </nav>

              {/* Mobile hamburger */}
              <button
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen((m) => !m)}
                aria-label="Toggle menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex flex-col">
                  <NavLink href="#home" onClick={() => setMenuOpen(false)} active={active === "home"}>About Us</NavLink>
                  <NavLink href="#case-studies" onClick={() => setMenuOpen(false)}>Case Studies</NavLink>
                  <details className="px-3 py-2">
                    <summary className="cursor-pointer text-[15px] text-gray-700">Our Services</summary>
                    <div className="mt-2 flex flex-col">
                      <NavLink href="#services" onClick={() => setMenuOpen(false)}>Mobile App Development</NavLink>
                      <NavLink href="#services" onClick={() => setMenuOpen(false)}>Web Development</NavLink>
                      <NavLink href="#services" onClick={() => setMenuOpen(false)}>Custom Software</NavLink>
                    </div>
                  </details>
                  <NavLink href="#how-we-work" onClick={() => setMenuOpen(false)}>How We Work</NavLink>
                  <NavLink href="#career" onClick={() => setMenuOpen(false)}>Career</NavLink>
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="mx-3 my-2 inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-rose-700"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Section 1 – HERO (layout like Site01, copy/buttons from Site03) */}
      <section id="home" className="relative">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(245,151,164,0.25)_0%,rgba(255,255,255,0.6)_35%,rgba(255,255,255,1)_65%)]"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text block with SettleInn wording */}
            <div>
              <p className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 shadow-sm mb-4">
                ABOUT SETTLEINN
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Settle in with <span className="text-rose-600">comfort</span>,
                <br className="hidden sm:block" /> convenience & community
              </h1>
              <p className="mt-5 text-gray-700 leading-relaxed max-w-xl">
                At SettleInn, we make it seamless for people to settle into new cities and communities. From finding the perfect rental or long‑term home, to accessing reliable ride‑sharing, moving, and premium transportation with DriveU, we bring every essential service under one roof.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
                We don’t just connect people to houses or cars, we connect them to comfort, convenience, and community. Whether you’re a newcomer, a student, a professional, or a family, SettleInn is your trusted partner for housing, mobility, and integration services.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  Request a Quote
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-white text-sm font-semibold shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Visual block – mimic Site01 office image with dark card */}
            <div className="relative">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/M1amrI0b5S0?autoplay=1&mute=1&playsinline=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=M1amrI0b5S0"
                  title="3D animated Landing page!"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* dotted world-ish deco */}
              <svg
                className="absolute -right-8 -bottom-8 w-56 h-56 text-rose-200"
                viewBox="0 0 200 200"
                fill="currentColor"
                aria-hidden
              >
                {Array.from({ length: 200 }).map((_, i) => (
                  <circle key={i} cx={(i % 20) * 10} cy={Math.floor(i / 20) * 10} r="1.2" />
                ))}
              </svg>
            </div>

          </div>

          {/* Stats row (Site01 style) */}
          <div className="mt-10 lg:mt-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/80 rounded-3xl ring-1 ring-gray-200 p-6 shadow">
              {[
                { k: "378+", v: "Rental Services" },
                { k: "30+", v: "Moving Services" },
                { k: "8+", v: "Ride Sharing" },
                { k: "5+", v: "Years Of Experience" },
              ].map((s) => (
                <div key={s.v} className="text-center">
                  <div className="text-3xl font-extrabold text-rose-600">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-gray-600">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 – Services (exactly like Site02 structure) */}
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
                {/* phone/code icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-600">
                  <rect x="3" y="3" width="14" height="18" rx="2" />
                  <path d="M7 7h6M7 11h6M7 15h4" />
                </svg>
              </div>
              <h3 className="text-center text-lg font-semibold">Mobile App Development</h3>
              <p className="mt-3 text-center text-gray-600">
                The most recent techniques and technologies are being used to develop a mobile application. Our skilled team of mobile developers creates the greatest mobile apps with Flutter technology…
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100">
                {/* web cog icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-600">
                  <rect x="2" y="4" width="20" height="14" rx="2" />
                  <path d="M2 8h20" />
                  <circle cx="8" cy="12" r="2" />
                  <path d="M14 12h6" />
                </svg>
              </div>
              <h3 className="text-center text-lg font-semibold">Web Development</h3>
              <p className="mt-3 text-center text-gray-600">
                Developing web‑based software contributes to excellent user experiences. For maximum acceptance and conversion rates, our team specializes in creating, updating, and maintaining business and customer‑facing web applications…
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 ring-1 ring-rose-100">
                {/* gear */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-600">
                  <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V22a2 2 0 01-4 0v-.07a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 013 17.71l.06-.06c.47-.47.6-1.17.33-1.77A1.65 1.65 0 002 14.5v-1a1.65 1.65 0 001.39-1.18c.27-.6.14-1.3-.33-1.77L3 10.5a2 2 0 012.83-2.83l.06.06c.47.47 1.17.6 1.77.33A1.65 1.65 0 0010.5 6h1a1.65 1.65 0 001.18-1.39c.27-.6.14-1.3-.33-1.77l-.06-.06A2 2 0 0116.29 1l.06.06c.47.47.6 1.17.33 1.77A1.65 1.65 0 0018 4.5V5c.62 0 1.2.25 1.61.66.41.41.66.99.66 1.61v.5c0 .62-.25 1.2-.66 1.61-.41.41-.99.66-1.61.66h-.5z" />
                </svg>
              </div>
              <h3 className="text-center text-lg font-semibold">Custom Software</h3>
              <p className="mt-3 text-center text-gray-600">
                Let’s develop a customized software program. Do you have a special need for your company? Together, we will create a unique software solution that meets your requirements and project objectives…
              </p>
            </div>
          </div>
        </div>

        {/* subtle circular decoration like Site02 */}
        <div className="pointer-events-none absolute -right-24 top-24 hidden lg:block">
          <div className="h-64 w-64 rounded-full border-2 border-rose-100" />
        </div>
      </section>
      {/* === SECTION: FEATURED WORK === */}
      <section id="featured" className="relative py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Take A Look At Our <span className="text-rose-600">Featured Work</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              We provide a range of services that are intended to provide unique solutions tailored to your company’s requirements.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {/* Card 1 */}
            <article className="relative rounded-[28px] bg-white ring-1 ring-gray-100 shadow-[0_12px_40px_rgba(0,0,0,.06)] overflow-hidden">
              {/* Top visual */}
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-rose-600 to-red-500 flex items-end p-6">
                <h3 className="text-white text-2xl font-extrabold drop-shadow">StampEzee</h3>
              </div>

              {/* Bottom panel */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">StampEzee</p>

                  <a
                    href="#case-studies"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white shadow hover:bg-rose-700 transition"
                    aria-label="Open case study"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                {/* Tech icons row */}
                <div className="mt-4 flex items-center gap-3">
                  {/* Flutter */}
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50">
                    <svg viewBox="0 0 256 256" className="h-6 w-6" fill="currentColor">
                      <path d="M91 173l74-74-31-31-105 105 31 31 31-31zm43 43l31-31-31-31-31 31 31 31z" />
                    </svg>
                  </span>
                  {/* Apple */}
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M16.365 1.43c0 1.14-.47 2.22-1.22 3.02-.8.86-2.1 1.53-3.35 1.43-.14-1.08.47-2.25 1.2-3 .82-.85 2.22-1.47 3.37-1.45zM20.69 17.45c-.65 1.5-1.43 2.98-2.6 4.2-1 .98-2.3 2.1-3.77 2.1-1.42 0-1.8-.68-3.36-.68-1.6 0-2.02.66-3.4.7-1.4.04-2.47-1.02-3.48-2-2.37-2.3-4.2-6.54-1.76-9.45 1.02-1.25 2.64-2.04 4.27-2.06 1.34-.03 2.6.72 3.37.72.8 0 2.3-.88 3.88-.75 0 0 2.88.28 4.24 2.68-3.74 2.07-3.15 7.49.42 9.5z" />
                    </svg>
                  </span>
                  {/* Android */}
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M6 8h12v9a2 2 0 01-2 2h-1v3h-2v-3H9v3H7v-3H6a2 2 0 01-2-2V8zm12-3l1-2M5 3L4 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="relative rounded-[28px] bg-white ring-1 ring-gray-100 shadow-[0_12px_40px_rgba(0,0,0,.06)] overflow-hidden">
              <div className="aspect-[16/10] w-full bg-sky-500 flex items-end p-6">
                <h3 className="text-white text-2xl font-extrabold drop-shadow">SnapEzee</h3>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">SnapEzee</p>
                  <a
                    href="#case-studies"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white shadow hover:bg-rose-700 transition"
                    aria-label="Open case study"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50">
                    <svg viewBox="0 0 256 256" className="h-6 w-6" fill="currentColor">
                      <path d="M91 173l74-74-31-31-105 105 31 31 31-31zm43 43l31-31-31-31-31 31 31 31z" />
                    </svg>
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M16.365 1.43c0 1.14-.47 2.22-1.22 3.02-.8.86-2.1 1.53-3.35 1.43-.14-1.08.47-2.25 1.2-3 .82-.85 2.22-1.47 3.37-1.45zM20.69 17.45c-.65 1.5-1.43 2.98-2.6 4.2-1 .98-2.3 2.1-3.77 2.1-1.42 0-1.8-.68-3.36-.68-1.6 0-2.02.66-3.4.7-1.4.04-2.47-1.02-3.48-2-2.37-2.3-4.2-6.54-1.76-9.45 1.02-1.25 2.64-2.04 4.27-2.06 1.34-.03 2.6.72 3.37.72.8 0 2.3-.88 3.88-.75 0 0 2.88.28 4.24 2.68-3.74 2.07-3.15 7.49.42 9.5z" />
                    </svg>
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M6 8h12v9a2 2 0 01-2 2h-1v3h-2v-3H9v3H7v-3H6a2 2 0 01-2-2V8zm12-3l1-2M5 3L4 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <a
              href="#case-studies"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-rose-700"
            >
              View Case Studies
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* === SECTION: TESTIMONIALS === */}
      <section id="testimonials" className="relative bg-rose-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-center">
            What Our <span className="text-rose-600">Clients Think</span>
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <figure className="text-center">
              <figcaption className="font-semibold text-gray-900">Rabin Thapa</figcaption>
              <div className="text-xs text-gray-500 -mt-0.5 mb-3">CEO</div>

              <div className="relative rounded-[24px] border-2 border-rose-200 bg-white p-6 shadow-sm">
                {/* opening quote */}
                <div className="absolute -top-4 left-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">“</div>
                <p className="text-gray-700">
                  “The team at RootDevs was absolutely fantastic to work with. They were incredibly responsive,
                  knowledgeable, and always willing to go the extra mile to ensure our project was a success…”
                </p>
                {/* closing quote */}
                <div className="absolute -bottom-4 right-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">”</div>
              </div>
            </figure>

            {/* Testimonial 2 */}
            <figure className="text-center">
              <figcaption className="font-semibold text-gray-900">Bosco Edwin</figcaption>
              <div className="text-xs text-gray-500 -mt-0.5 mb-3">CEO</div>

              <div className="relative rounded-[24px] border-2 border-rose-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-4 left-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">“</div>
                <p className="text-gray-700">
                  “I was initially skeptical about outsourcing our software development, but RootDevs completely changed my mind.
                  Their communication was excellent, and they were always transparent…”
                </p>
                <div className="absolute -bottom-4 right-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">”</div>
              </div>
            </figure>

            {/* Testimonial 3 */}
            <figure className="text-center">
              <figcaption className="font-semibold text-gray-900">Dread La</figcaption>
              <div className="text-xs text-gray-500 -mt-0.5 mb-3">Managing Director</div>

              <div className="relative rounded-[24px] border-2 border-rose-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-4 left-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">“</div>
                <p className="text-gray-700">
                  “Working with RootDevs was a pleasure. Their team was not only skilled but also friendly and easy to work with.
                  They were always willing to listen to our feedback and make adjustments…”
                </p>
                <div className="absolute -bottom-4 right-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">”</div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Dummy anchors for nav routes not implemented in this snippet */}
      <section id="case-studies" className="sr-only" aria-hidden="true"></section>
      <section id="how-we-work" className="sr-only" aria-hidden="true"></section>
      <section id="career" className="sr-only" aria-hidden="true"></section>
      <section id="contact" className="sr-only" aria-hidden="true"></section>
      <section id="quote" className="sr-only" aria-hidden="true"></section>
    </main>
  );
}
