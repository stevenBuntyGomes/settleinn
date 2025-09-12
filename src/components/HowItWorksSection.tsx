import React from "react";

export default function HowItWorksSection() {
  return (
    <section id="how-we-work" className="relative py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            How our services <span className="text-rose-600">Works</span>
          </h2>
        </div>

        {/* STEP 1 */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <span className="absolute -left-4 top-3 h-10 w-3 bg-rose-500/20 rounded-r-xl" />
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Step 1</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              Select a template and upload your product photos
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Use professionally designed templates proven to increase conversions. Upload your photos
              or short clips, then jump right into editing.
            </p>
          </div>

          {/* mock image/card */}
          <div className="relative">
            <div className="relative h-72 w-full rounded-3xl bg-gray-50 ring-1 ring-gray-200 shadow-sm overflow-hidden">
              <div className="absolute left-6 top-6 rounded-xl bg-rose-50 ring-1 ring-rose-100 px-4 py-2 text-rose-600 text-sm font-semibold">
                UNLOCK <span className="font-extrabold">20% OFF</span>
              </div>
              <div className="absolute inset-0 m-8 rounded-2xl bg-white ring-1 ring-gray-200 grid grid-cols-5">
                <div className="col-span-4 grid place-items-center">
                  <div className="rounded-xl border border-dashed border-gray-300 px-5 py-4 text-gray-500 text-sm">
                    Drag media here
                  </div>
                </div>
                <div className="col-span-1 border-l border-gray-100 p-3">
                  <div className="h-8 w-full rounded-lg bg-gray-100 mb-2" />
                  <div className="h-8 w-full rounded-lg bg-gray-100 mb-2" />
                  <div className="h-8 w-full rounded-lg bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-72 w-full rounded-3xl bg-gray-50 ring-1 ring-gray-200 shadow-sm overflow-hidden">
              <div className="absolute inset-0 m-8 rounded-2xl bg-white ring-1 ring-gray-200 p-4">
                <div className="flex gap-3 mb-4">
                  <div className="h-7 w-20 rounded-md bg-gray-100" />
                  <div className="h-7 w-24 rounded-md bg-gray-100" />
                  <div className="h-7 w-16 rounded-md bg-gray-100" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-36 rounded-xl bg-rose-50 ring-1 ring-rose-100" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-100" />
                    <div className="h-4 w-5/6 rounded bg-gray-100" />
                    <div className="h-4 w-4/6 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <span className="absolute -left-4 top-3 h-10 w-3 bg-rose-500/20 rounded-r-xl" />
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Step 2</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">Personalize your product video</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Customize colors, fonts, captions, and music to match your brand. Fine-tune pacing and
              layouts with a simple, visual editor.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <span className="absolute -left-4 top-3 h-10 w-3 bg-rose-500/20 rounded-r-xl" />
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Step 3</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              Share your product video with potential customers
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Publish to social channels, run it as an ad, or download and add it to your store.
              Reaching new audiences is just a click away.
            </p>
          </div>

          {/* email/share mock */}
          <div>
            <div className="relative h-72 w-full rounded-3xl bg-gray-50 ring-1 ring-gray-200 shadow-sm overflow-hidden">
              <div className="absolute inset-0 m-8 rounded-2xl bg-white ring-1 ring-gray-200 p-5">
                <div className="space-y-4">
                  <div className="h-5 w-40 rounded bg-gray-100" />
                  <div className="h-10 w-full rounded-lg bg-gray-100" />
                  <div className="h-10 w-full rounded-lg bg-gray-100" />
                  <div className="h-16 w-full rounded-lg bg-gray-100" />
                  <div className="flex justify-end">
                    <button className="inline-flex items-center rounded-lg bg-rose-600 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-rose-700">
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 h-28 w-44 rounded-3xl bg-rose-100/60 rotate-6" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#quote"
            className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-white text-sm font-semibold shadow hover:bg-rose-700"
          >
            Make a product video
          </a>
        </div>
      </div>
    </section>
  );
}
