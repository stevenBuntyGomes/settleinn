// components/Title.tsx
import React from "react";

type TitleProps = {
  title: string;
  subTitle?: string;
  /** Alignment of the block on md+ screens (mobile stays centered) */
  align?: "left" | "center";
  /** Tailwind class for font family, e.g. "font-playfair" */
  font?: string;
};

export default function Title({
  title,
  subTitle,
  align = "center",
  font = "font-playfair",
}: TitleProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" ? "md:items-start md:text-left" : ""
      }`}
    >
      <h1 className={`text-4xl md:text-[40px] ${font}`}>{title}</h1>
      {subTitle ? (
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">{subTitle}</p>
      ) : null}
    </div>
  );
}
