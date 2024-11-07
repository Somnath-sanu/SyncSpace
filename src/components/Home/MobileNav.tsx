"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import LoadingButton from "../LoadingButton";
import { useState } from "react";


export default function MobileNav({
  children,
  user,
}: {
  children: React.ReactNode;
  user: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  // console.log({user}); // undefined
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] dark">
        <SheetHeader>
          <SheetTitle>SyncSpace</SheetTitle>
        </SheetHeader>
        <div className="mt-9 flex flex-col space-y-4">
          <Link
            href={"/#pricing"}
            className="w-full rounded-full bg-gradient-to-r from-indigo-800 via-blue-800 to-blue-500 px-6 py-2 text-center font-semibold text-white transition duration-300 ease-in-out hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <LoadingButton
            href={"/feedback"}
            className="w-full rounded-full bg-gradient-to-r from-indigo-800 via-blue-800 to-blue-500 px-6 py-2 text-center font-semibold text-white transition duration-300 ease-in-out hover:opacity-80"
          >
            Feedback
          </LoadingButton>

          <LoadingButton
            href={"/dashboard"}
            className="w-full rounded-full bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:opacity-80"
          >
            {user ? "Dashboard" : "Get Started"}
          </LoadingButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
