"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useHoverStore } from "@/store/hover-card-store";
import CoverOption from "./CoverOption";
import { useEffect, useState } from "react";
import { SkeletonLoader } from "@/components/SkeletonLoader";

export function Card({
  metadata,
  id,
}: {
  metadata: {
    creatorId: string;
    email: string;
    title: string;
  };
  id: string;
}) {
  const { hovered, setHovered } = useHoverStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cardLoading, setCardLoading] = useState(false);

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * (CoverOption.length - 1));

    const image = CoverOption[randomIndex];

    setImageUrl(image.imageUrl);
  }

  useEffect(() => {
    getRandomImage();
  }, []);

  return (
    <>
      {cardLoading ? (
        <SkeletonLoader />
      ) : (
        <div
          className={cn(
            "relative z-10 col-span-1 aspect-[100/127] overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-neutral-900",
            hovered !== null && hovered !== id && "scale-[0.98] blur-sm",
          )}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setCardLoading(true)}
        >
          <div>
            <Image
              src={imageUrl || "/abs1.jpeg"}
              alt={"placeholder"}
              fill
              className="absolute inset-0 object-cover"
            />
          </div>
          <div
            className={cn(
              "absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300",
              hovered === id ? "sm:opacity-100" : "sm:opacity-0",
            )}
          >
            <div className="w-full select-none truncate bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent opacity-100">
              <p className="w-full truncate text-balance text-center">
                {metadata.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
