"use client";

import { useRouter } from "next/navigation";
import { GlobeDemo } from "./GlobeDemo";
import { useEffect } from "react";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";

export default function Hero() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard", {
      kind: "full" as PrefetchKind,
    });
    router.prefetch("/feedback", {
      kind: "full" as PrefetchKind,
    });
  }, [router]);
  return (
    <section className="h-full w-full overflow-hidden md:max-h-screen">
      <GlobeDemo />
    </section>
  );
}
