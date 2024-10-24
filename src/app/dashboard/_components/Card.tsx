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
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden col-span-1 aspect-[100/127] transition-all duration-300 ease-out z-10",
            hovered !== null && hovered !== id && "blur-sm scale-[0.98]"
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
              className=" object-cover absolute inset-0"
            />
          </div>
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
              hovered === id ? "sm:opacity-100" : "sm:opacity-0"
            )}
          >
            <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 select-none opacity-100">
              {metadata.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
