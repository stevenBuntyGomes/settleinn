import React from "react";

export default function HeroSection() {
  return (
    <section id="home" className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(245,151,164,0.25)_0%,rgba(255,255,255,0.6)_35%,rgba(255,255,255,1)_65%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <p className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 shadow-sm mb-4">
              ABOUT SETTLEINN
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              Settle inn with <span className="text-rose-600">comfort</span>,
              <br className="hidden sm:block" /> convenience & community
            </h1>
            <p className="mt-5 text-gray-700 leading-relaxed max-w-xl">
              At SettleInn, we make it seamless for people to settle into new cities and communities. From finding the
              perfect rental or long-term home, to accessing reliable ride-sharing, moving, and premium transportation
              with DriveU, we bring every essential service under one roof.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
              We don’t just connect people to houses or cars, we connect them to comfort, convenience, and community.
              Whether you’re a newcomer, a student, a professional, or a family, SettleInn is your trusted partner for
              housing, mobility, and integration services.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-white text-sm font-semibold shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                Request a Quote
              </a>
              <a
                href="/book_now"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-white text-sm font-semibold shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://drive.google.com/file/d/1AVOKKCgvr_8TH35Ux4rB_tqWJCaVgwN1/preview"
                title="SettleInn hero video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            <svg className="absolute -right-8 -bottom-8 w-56 h-56 text-rose-200" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
              {Array.from({ length: 200 }).map((_, i) => (
                <circle key={i} cx={(i % 20) * 10} cy={Math.floor(i / 20) * 10} r="1.2" />
              ))}
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 lg:mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/80 rounded-3xl ring-1 ring-gray-200 p-6 shadow">
            {[
              { k: "378+", v: "Short Stays" },
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
  );
}
