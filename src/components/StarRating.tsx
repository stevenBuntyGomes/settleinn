// components/StarRating.tsx
"use client";

import React from "react";
import { assets } from "@/assets/assets";

type StarRatingProps = {
  /** Number of filled stars (0–total). Non-fractional like your original. */
  rating?: number;
  /** Total stars to render. Default: 5 */
  total?: number;
  /** Optional wrapper class */
  className?: string;
  /** Star size (e.g. 18 or "18px"). Default: 18px */
  size?: number | string;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating = 4,
  total = 5,
  className = "",
  size,
}) => {
  const clamped = Math.max(0, Math.min(rating, total));
  const dim = typeof size === "number" ? `${size}px` : size ?? "18px";

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <img
          key={index}
          alt={index < clamped ? "star filled" : "star"}
          src={index < clamped ? assets.starIconFilled : assets.starIconOutlined}
          className="inline-block"
          style={{ width: dim, height: dim }}
          draggable={false}
        />
      ))}
    </span>
  );
};

export default StarRating;
