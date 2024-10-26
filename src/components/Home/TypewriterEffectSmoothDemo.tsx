"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "./TypewriterEffect";
import { User } from "@clerk/nextjs/server";
export function TypewriterEffectSmoothDemo({
  user,
}: {
  user: string | undefined;
}) {
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
    <div className="flex h-[40rem] flex-col items-center justify-center">
      <p className="mx-auto max-w-screen-lg text-balance text-center text-xs text-neutral-600 dark:text-neutral-200 sm:text-xl">
        Turn any document into a space for live collaboration and watch ideas
        grow together.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Link href={"/dashboard"} className="block">
          <button className="h-10 w-40 rounded-xl border-r border-transparent bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent text-sm text-white shadow-sm outline-none transition-transform hover:scale-105 dark:border-blue-900/70">
            {user ? "Dashboard" : "Get Started"}
          </button>
        </Link>
        <Link href={"/sign-up"} className="block">
          <button className="h-10 w-40 animate-shimmer rounded-xl border border-black bg-gradient-to-r from-white via-neutral-50 to-neutral-100 text-sm text-black shadow-sm transition-transform hover:scale-105">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
