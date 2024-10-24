import { cn } from "@/lib/utils";
import { FolderSync } from "lucide-react";

import Link from "next/link";
import React from "react";
import ActionButton from "./ActionButton";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full flex-nowrap bg-dark-100 flex items-center justify-between gap-2 p-2 sm:p-4 max-w-[90%] m-auto",
        className
      )}
    >
      <Link href={"/dashboard"} className="md:flex-1 mr-4">
        <ActionButton side="right" sideOffset={5} content="Dashboard">
          <FolderSync className="md:size-7 sm:size-6 size-4  animate-pulse" />
        </ActionButton>
      </Link>

      {children}
    </header>
  );
};

export default Header;
