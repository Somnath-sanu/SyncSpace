/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Progress } from "./ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import usePremiumModal from "@/store/premium-modal-store";

export function SidebarOptInForm({ roomDocuments }: { roomDocuments: any }) {
  const premiumModal = usePremiumModal();
  return (
    <Card className="shadow-none">
      <div className="absolute bottom-10 w-[85%]">
        <Progress
          value={(roomDocuments?.data.length / 3) * 100}
          className="bg-slate-300"
        />
        <h2 className="text-sm font-bold my-2 pl-4">
          <strong>{roomDocuments?.data.length}</strong> Out of{" "}
          <strong className="">3</strong> files used
        </h2>
        {roomDocuments?.data.length >= 3 && (
          <Alert>
            <AlertTitle className="flex gap-2 items-center justify-center">
              <AlertCircle className="h-7 w-7" />
              <span className="text-balance leading-normal">
                Upgrade your plan for unlimited access
              </span>
            </AlertTitle>
            <AlertDescription className="grid place-content-center ">
              <Button
                variant="outline"
                className="dark:bg-white dark:text-black"
                onClick={() => {
                  premiumModal.setOpen(true)
                }}
              >
                Upgrade
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
}
