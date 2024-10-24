"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import LoadingButton from "../LoadingButton";
import { useState } from "react";

export default function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-between max-w-[150px] w-full">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              Menu
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-9">
          <Link
            href={"/#pricing"}
            className="w-full bg-gradient-to-r from-indigo-800 via-blue-800 to-blue-500 text-white transition duration-300 ease-in-out font-semibold px-6 py-2 rounded-full hover:opacity-80 text-center"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <LoadingButton
            href={"/feedback"}
            className="w-full bg-gradient-to-r from-indigo-800 via-blue-800 to-blue-500 text-white transition duration-300 ease-in-out font-semibold px-6 py-2 rounded-full hover:opacity-80 text-center"
          >
            Feedback
          </LoadingButton>

          <LoadingButton
            href={"/dashboard"}
            className="w-full bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent text-white transition duration-300 ease-in-out font-semibold px-6 py-2 rounded-full hover:opacity-80"
          >
            Get Started
          </LoadingButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
