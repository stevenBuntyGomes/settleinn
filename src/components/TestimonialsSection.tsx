import React from "react";

export default function TestimonialsSection() {
  return (
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
              <div className="absolute -top-4 left-6 rounded-full bg-white px-2 text-rose-500 text-2xl leading-none">“</div>
              <p className="text-gray-700">
                “The team at RootDevs was absolutely fantastic to work with. They were incredibly responsive,
                knowledgeable, and always willing to go the extra mile to ensure our project was a success…”
              </p>
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
  );
}
