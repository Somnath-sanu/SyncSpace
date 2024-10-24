"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "./TypewriterEffect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Work",
    },
    {
      text: "Together",
    },
    {
      text: "Right",
    },
    {
      text: "Now",
    },
    {
      text: "SyncSpace :)",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-xl max-w-screen-lg text-balance mx-auto text-center ">
        Turn any document into a space for live collaboration and watch ideas
        grow together.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href={"/dashboard"} className="block">
          <button className="w-40 h-10 rounded-xl bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent  outline-none  dark:border-blue-900/70 border-transparent text-white text-sm shadow-sm hover:scale-105 border-r transition-transform">
            Get Started
          </button>
        </Link>
        <Link href={"/sign-up"} className="block">
          <button className="w-40 h-10 rounded-xl bg-gradient-to-r from-white via-neutral-50 to-neutral-100 text-black border border-black  text-sm animate-shimmer shadow-sm hover:scale-105 transition-transform">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
