"use client";
import React, { useEffect, useState } from "react";

type DriveVideoProps = {
  /** Google Drive file id */
  fileId?: string;
  /** Optional heading under the play button */
  label?: string;
};

export default function DriveHeroVideo({
  fileId = "1paQF1npKD8plpshfOfkq1dJmjB_7U1uh",
  label = "Watch video",
}: DriveVideoProps) {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Teaser card */}
      <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden">
        {/* subtle tint like the template */}
        <div className="absolute inset-0 bg-gradient-to-br" />

        {/* Centered play button + label */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Play video"
              className="relative inline-grid place-items-center h-16 w-16 rounded-full bg-white text-rose-600 shadow-lg ring-2 ring-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-300"
            >
              {/* pulse/waves */}
              <span className="absolute h-16 w-16 rounded-full bg-white/50 animate-ping" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Let’s see virtually how it works</p>
              <p className="text-xl font-extrabold text-gray-900">{label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-rose-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[21/9] bg-black">
              <iframe
                key={fileId /* ensures reload when closing/opening */}
                className="absolute inset-0 h-full w-full"
                src={`https://drive.google.com/file/d/${fileId}/preview`}
                title="Intro video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-800 hover:bg-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6 6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
