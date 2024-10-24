"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface LoadingButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LoadingButton = ({ href, children, className }: LoadingButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      className={`relative ${className}`}
      disabled={isLoading}
    >
      {children}
      {isLoading && <Loader className="ms-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default LoadingButton;
