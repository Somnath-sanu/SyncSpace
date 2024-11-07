import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import MobileNav from "./MobileNav";
import LoadingButton from "../LoadingButton";
import { currentUser } from "@clerk/nextjs/server";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <header className="sticky top-0 z-10 from-black via-black to-transparent shadow-sm bg-gradient-to-r">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "Pixelify Sans, cursive" }}
        >
          SyncSpace
        </Link>
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            href={"/#pricing"}
            className="text-lg text-white transition duration-200 ease-in-out hover:text-blue-600"
          >
            Pricing
          </Link>
          <LoadingButton
            href={"/feedback"}
            className="rounded-full bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:opacity-80"
          >
            Feedback
          </LoadingButton>

          <LoadingButton
            href={"/dashboard"}
            className="rounded-full bg-gradient-to-r from-indigo-800 via-blue-800 to-transparent px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:opacity-80"
          >
            {user ? "Dashboard" : "Get Started"}
          </LoadingButton>

          {/* <ThemeDialog/> */}

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <div className="p-0 ">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <MobileNav user={user?.emailAddresses[0].emailAddress}>
            <button className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
