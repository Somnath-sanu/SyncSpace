"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { updateDocument } from "@/lib/actions/room.actions";
import { z } from "zod";
import { Input } from "./ui/input";
import { Loader } from "lucide-react";

export default function RenameModal({
  title,
  roomId,
  setNewDocumentTitle,
  onClose,
}: {
  title: string;
  roomId: string;
  setNewDocumentTitle: (roomId: string, title: string) => void;
  onClose: () => void;
}) {
  // const { isOpen, onClose, initialValues } = useRenameModal();
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const closeRef = useRef<ElementRef<typeof DialogClose>>(null);

  const titleSchema = z.string().min(2).max(20);

  const [pending, setPending] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { success } = titleSchema.safeParse(newTitle);
    if (!success) {
      toast.error("Enter a valid title");
      return;
    }
    setPending(true);

    try {
      await updateDocument(roomId, newTitle);
      toast.success("Document renamed");
      setNewDocumentTitle(roomId, newTitle);
    } catch (error) {
      console.error("Error to rename document in rename-modal ", error);
      toast.error("Failed to rename document");
    } finally {
      setPending(false);
      // closeRef.current?.click(); // Close the dialog after success
      onClose();
    }
  };

  return (
    <DialogContent className="border-none outline-none">
      <DialogHeader>
        <DialogTitle>Edit document title</DialogTitle>
      </DialogHeader>
      <DialogDescription>Enter a new title for this document</DialogDescription>
      <form onSubmit={onSubmit} className="space-y-4 ">
        <Input
          disabled={pending}
          autoFocus
          required
          maxLength={20}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Document title"
          className="border-none outline-none"
        />
        <div className="flex flex-col-reverse sm:flex-row gap-2  sm:items-center sm:justify-end w-full">
          <DialogClose ref={closeRef}>
            <Button
              type="button"
              variant={"outline"}
              className="mb-2 sm:mb-0 w-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={pending} className="">
            {pending ? (
              <span className="flex gap-1 items-center">
                <Loader className="size-4 animate-spin" /> Saving
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
