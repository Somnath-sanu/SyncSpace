"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader, Mic, MicOff } from "lucide-react";
import { useTransition } from "react";

export function AudioButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAudio = searchParams?.get("audio");

  const [pending, startTransaction] = useTransition();

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          audio: isAudio ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const Icon = isAudio ? Mic : MicOff;

  return (
    <button
      onClick={() => startTransaction(onClick)}
      className="hover:opacity-75 transition mr-4 flex gap-1 items-center disabled:opacity-50 disabled:cursor-wait"
      disabled={pending}
    >
      <Icon className="size-5" />
      {pending && <Loader className="size-4 animate-spin" />}
    </button>
  );
}
