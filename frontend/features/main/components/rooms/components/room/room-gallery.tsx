"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
  name: string;
}

export default function RoomGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-3">
      {/* Main image */}
      <div className="relative flex-1 overflow-hidden bg-neutral-900 h-120 group">
        <Image
          key={active}
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
          priority
          sizes="(max-width: 768px) 100vw, 75vw"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Image counter */}
        <div className="absolute bottom-4 right-4  backdrop-blur-sm text-primary text-[10px] tracking-[0.2em] px-3 py-1.5 uppercase">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-32.5">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              relative overflow-hidden flex-1 transition-all duration-300
              ${
                active === i
                  ? "ring-1 ring-primary brightness-100"
                  : "brightness-50 hover:brightness-75"
              }
            `}
          >
            <Image
              src={img}
              alt={`${name} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="130px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
