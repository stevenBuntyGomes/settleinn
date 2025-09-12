"use client";

import React, { useEffect, useState } from "react";

/** Small helper for smooth in-page scroll + active link */
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

function NavLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
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

export default function SiteHeader() {
  const sections = ["home", "services", "how-we-work"];
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
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center" aria-label="SettleInn home">
              <img
                src="https://drive.google.com/thumbnail?id=1Uio7fAiJr9u8yOCp1YfngKQ4rvkXCT0I&sz=w320"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://lh3.googleusercontent.com/d/1Uio7fAiJr9u8yOCp1YfngKQ4rvkXCT0I=w320";
                }}
                alt="SettleInn"
                className="block h-10 sm:h-11 w-auto origin-left scale-[3.9] sm:scale-[4]"
                referrerPolicy="no-referrer"
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="#home" active={active === "home"}>
                About Us
              </NavLink>
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
                    {["Short Stay", "Moving Service", "Ride Sharing"].map((label) => (
                      <a
                        key={label}
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                          setServicesOpen(false);
                        }}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <NavLink href="#how-we-work" active={active === "how-we-work"}>
                How We Work
              </NavLink>
              <NavLink href="#career">Career</NavLink>

              <a
                href="#contact"
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
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
        {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
        {(() => {
          const [menuOpen, setMenuOpenState] = [false, (v: boolean) => v]; // placeholder to please TS in IIFE
          return null;
        })()}
      </div>

      {/* Mobile menu (controlled locally) */}
      {/* Separate element outside blurred container */}
      <MobileMenu
        active={active}
        onClose={() => {
          // this will be replaced by internal state; kept minimal to avoid over-complication
        }}
      />
    </header>
  );
}

/** Minimal self-contained mobile menu (no external state) */
function MobileMenu({
  active,
  onClose,
}: {
  active: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setOpen((o) => !o);
    // expose a simple custom event if you want to toggle from header button later
    window.addEventListener("settleinn:toggle-menu", toggle);
    return () => window.removeEventListener("settleinn:toggle-menu", toggle);
  }, []);

  if (!open) return null;

  return (
    <div className="md:hidden border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col">
          <a className={`px-3 py-2 text-[15px] ${active === "home" ? "text-rose-600" : "text-gray-700"}`} href="#home" onClick={onClose}>
            About Us
          </a>
          <a className="px-3 py-2 text-[15px] text-gray-700" href="#case-studies" onClick={onClose}>
            Case Studies
          </a>
          <details className="px-3 py-2">
            <summary className="cursor-pointer text-[15px] text-gray-700">Our Services</summary>
            <div className="mt-2 flex flex-col">
              {["Ride Sharing", "Moving Services", "Short Stays"].map((label) => (
                <a key={label} className="px-3 py-2 text-[15px] text-gray-700" href="#services" onClick={onClose}>
                  {label}
                </a>
              ))}
            </div>
          </details>
          <a className={`px-3 py-2 text-[15px] ${active === "how-we-work" ? "text-rose-600" : "text-gray-700"}`} href="#how-we-work" onClick={onClose}>
            How We Work
          </a>
          <a className="px-3 py-2 text-[15px] text-gray-700" href="#career" onClick={onClose}>
            Career
          </a>
          <a
            href="#contact"
            onClick={onClose}
            className="mx-3 my-2 inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-rose-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
