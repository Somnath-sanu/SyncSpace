/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createDocument } from "@/lib/actions/room.actions";
import { cn } from "@/lib/utils";
import { Plus, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

interface NewDocumentButtonProps {
  userId: string;
  email: string;
  roomDocuments: any;
}

export default function NewDocumentButton({
  userId,
  email,
  roomDocuments,
}: NewDocumentButtonProps) {
  const router = useRouter();
  const [pending, startTransaction] = useTransition();

  const addDocumentHandler = async () => {
    if (roomDocuments?.data.length === 3) {
      toast.warning("Upgrade");

      return;
    }
    try {
      const room = await createDocument({ userId, email });

      // console.log({
      //   room,
      // });

      if (room) router.push(`/dashboard/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // if (pending) {
  //   return <Loader title="Creating new workspace..."/>
  // }

  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6 disabled:cursor-not-allowed",
        pending && "opacity-75 cursor-wait hover:bg-blue-600 select-none"
      )}
      onClick={() => startTransaction(addDocumentHandler)}
      disabled={roomDocuments?.data.length >= 3}
    >
      <Plus
        className={cn("h-12 w-12 text-white stroke-1", pending && "invisible")}
      />
      <p className="text-sm text-white font-light select-none">
        {pending ? (
          <div className="flex items-center transition-all justify-center w-full h-full">
            <Rocket className="size-10 animate-bounce transition-all " />
          </div>
        ) : (
          "New Document"
        )}
      </p>
    </button>
  );
}
