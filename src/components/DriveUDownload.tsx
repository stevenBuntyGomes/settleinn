"use client";
import React, { useMemo, useState } from "react";

/** Extract a Drive file ID from either a raw ID or a share URL */
const driveId = (value: string) => value.match(/[-\w]{25,}/)?.[0] ?? value;

/** Build image URLs */
const driveView = (value: string) =>
  `https://drive.google.com/uc?export=view&id=${driveId(value)}`;
const driveThumb = (value: string, w = 1200) =>
  `https://drive.google.com/thumbnail?id=${driveId(value)}&sz=w${w}`;

/** <img> that tries the inline "view" URL first, then falls back to "thumbnail" if blocked */
function DriveImage({
  file,
  alt,
  w = 1200,
  className = "",
  draggable = false,
}: {
  file: string;
  alt: string;
  w?: number;
  className?: string;
  draggable?: boolean;
}) {
  const [src, setSrc] = useState(() => driveView(file));
  const fallback = useMemo(() => driveThumb(file, w), [file, w]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={draggable}
      referrerPolicy="no-referrer"
      onError={() => src !== fallback && setSrc(fallback)}
    />
  );
}

/** Top-left brand logo (exact URLs you provided) */
function BrandLogo() {
  return (
    <img
      src="https://drive.google.com/thumbnail?id=1Uio7fAiJr9u8yOCp1YfngKQ4rvkXCT0I&sz=w320"
      onError={(e) => {
        e.currentTarget.src = "https://lh3.googleusercontent.com/d/1Uio7fAiJr9u8yOCp1YfngKQ4rvkXCT0I=w320";
      }}
      alt="SettleInn"
      className="block h-10 sm:h-11 w-auto origin-left scale-[4.5] sm:scale-[4.7]"
      referrerPolicy="no-referrer"
      draggable={false}
      loading="eager"
      decoding="async"
    />
  );
}

export default function DriveUDownloadSection() {
  // === Paste your Drive share URLs or raw file IDs here ===
  const RIDER_PHONE =
    "https://drive.google.com/file/d/1FSSve9whoyQVBzQMn3OLtDOHOWOeZ-0d/view?usp=sharing";
  const DRIVER_PHONE =
    "https://drive.google.com/file/d/1zWoe47CPWfpvj-mfUi891wywwx6rJeaO/view?usp=sharing";
  const APP_STORE_BADGE =
    "https://drive.google.com/file/d/1_IJEQZpfNVc5A-duIUQMfjep0coZ7hK8/view?usp=sharing";
  const GOOGLE_PLAY_BADGE =
    "https://drive.google.com/file/d/1vCtbyUrRFCoinAgf8goQpUS3yo4rvCRO/view?usp=sharing";

  // (Optional) real store links:
  const APP_STORE_LINK = "#";
  const GOOGLE_PLAY_LINK = "#";

  return (
    <section id="driveu-apps" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            <span className="block">Need a Ride? Or Want to Become a Driver?</span>
            <span className="block mt-1">Download Our Apps</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-gray-700">
            Driven by Community. Powered by People. SettleInn DriveU connects neighbors,
            newcomers, and travelers with safe, trusted rides and meaningful driver opportunities.
          </p>
        </div>

        {/* Side-by-side panels */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Panel
            titleRed="Need a Ride?"
            subtitleRed="Download Our Apps"
            copy={[
              "Driven by Community.",
              "Powered by People.",
              "SettleInn DriveU connects neighbors, newcomers, and travelers with safe, trusted rides and meaningful driver opportunities.",
            ]}
            phoneFile={RIDER_PHONE}
            appStore={{ href: APP_STORE_LINK, file: APP_STORE_BADGE }}
            googlePlay={{ href: GOOGLE_PLAY_LINK, file: GOOGLE_PLAY_BADGE }}
          />

          <Panel
            titleRed="Become a Driver?"
            subtitleRed="Download Our Apps"
            copy={[
              "Driven by Community.",
              "Powered by People.",
              "SettleInn DriveU connects neighbors, newcomers, and travelers with safe, trusted rides and meaningful driver opportunities.",
            ]}
            phoneFile={DRIVER_PHONE}
            appStore={{ href: APP_STORE_LINK, file: APP_STORE_BADGE }}
            googlePlay={{ href: GOOGLE_PLAY_LINK, file: GOOGLE_PLAY_BADGE }}
          />
        </div>
      </div>
    </section>
  );
}

function Panel({
  titleRed,
  subtitleRed,
  copy,
  phoneFile,
  appStore,
  googlePlay,
}: {
  titleRed: string;
  subtitleRed: string;
  copy: string[];
  phoneFile: string;
  appStore: { href: string; file: string };
  googlePlay: { href: string; file: string };
}) {
  return (
    <div className="relative rounded-2xl bg-rose-50/60 ring-1 ring-rose-100 shadow-sm p-6 sm:p-7 pt-16 sm:pt-20">
      {/* Top-left logo */}
      <div className="absolute left-5 top-5">
        <BrandLogo />
      </div>

      <div className="grid items-center gap-6 lg:gap-8 grid-cols-2">
        {/* Text */}
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-rose-600">
            {titleRed}
            <br />
            {subtitleRed}
          </h3>

          <div className="mt-4 space-y-1.5">
            {copy.map((line, i) => (
              <p key={i} className="text-slate-800">
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 sm:gap-4">
            <Badge href={appStore.href}>
              <DriveImage
                file={appStore.file}
                alt="Download on the App Store"
                w={600}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Badge>
            <Badge href={googlePlay.href}>
              <DriveImage
                file={googlePlay.file}
                alt="Get it on Google Play"
                w={600}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Badge>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="justify-self-center">
          <div className="w-[min(240px,32vw)] sm:w-[min(280px,34vw)] aspect-[390/844] rounded-[28px] overflow-hidden shadow-xl ring-1 ring-rose-100 bg-white">
            <DriveImage
              file={phoneFile}
              alt="DriveU app on phone"
              w={1400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center overflow-hidden">
      {children}
    </a>
  );
}
