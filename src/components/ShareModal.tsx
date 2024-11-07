/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";
import { getAllUsers } from "@/lib/actions/user.actions";

import { z } from "zod";
import { toast } from "sonner";
import { SquareArrowOutUpRight, Ungroup } from "lucide-react";
import usePremiumModal from "@/store/premium-modal-store";

const emailSchema = z.string().email();

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");
  const [pending, startTransaction] = useTransition();

  // console.log({ collaborators });

  const premiumModal = usePremiumModal();

  function closeDialog() {
    if (!pending) {
      setOpen(!open);
    }
  }

  const shareDocumentHandler = async () => {
    const { success } = emailSchema.safeParse(email);

    if (!success) {
      toast.error("Please enter a valid email");

      return;
    }

    /**
     * Use some don't map
     * The issue is that the return statements inside the map callback function only return from that callback function, not from the entire shareDocumentHandler function. The map function will continue to iterate through all collaborators regardless of these returns.
     */

    // const isAlreadyInvited = collaborators.filter(
    //   (collaborator) => collaborator.email === email,
    // );

    // if (isAlreadyInvited.length > 0) {
    //   toast.warning("Already invited!");
    //   return;
    // }

    // console.log({
    //   collaborators,
    // });

    try {
      const response = await getAllUsers();

      // console.log({ response });

      const isUserExist = response?.data.filter((users: any) => {
        // console.log({users});

        return (
          users?.emailAddresses[0].emailAddress === email &&
          users?.emailAddresses[0].emailAddress !== user.info.email
        );
      });

      // console.log({ isUserExist });

      // console.log(user.info.id === creatorId); // true

      if (isUserExist.length > 0) {
        await updateDocumentAccess({
          roomId,
          email,
          userType: userType as UserType,
          updatedBy: user.info,
        });

        toast.success("Invitation sent!");
      } else {
        toast.warning("User doesn't exist");
      }
    } catch (error) {
      console.log({
        error,
      });
    } finally {
      setEmail("");
      closeDialog();
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogTrigger disabled={user.info.id !== creatorId}>
        <Button
          className="z-10 flex h-9 gap-2 px-4 disabled:cursor-not-allowed"
          disabled={user.info.id !== creatorId}
          variant={"outline"}
        >
          <SquareArrowOutUpRight className="size-3 sm:size-4" />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="bg-dark-400 flex flex-1 rounded-md">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none outline-none"
              required
              type="email"
              autoFocus={false}
              disabled={collaborators.length >= 6}
            />
            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
              loading={pending}
            />
          </div>
          {collaborators.length >= 6 ? (
            <div>
              <Button
                variant="outline"
                className="dark:bg-white dark:text-black"
                onClick={() => {
                  premiumModal.setOpen(true);
                }}
              >
                Upgrade
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              onClick={() => startTransaction(shareDocumentHandler)}
              className="flex h-full gap-1 bg-gradient-to-t from-blue-700 to-blue-500 px-5 font-sans shadow-sm hover:bg-gradient-to-tr"
              disabled={pending}
            >
              {pending ? (
                <Ungroup className="size-10 animate-spin transition-all" />
              ) : (
                "Invite"
              )}
            </Button>
          )}
        </div>

        <div className="my-2 space-y-2 overflow-y-auto">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
