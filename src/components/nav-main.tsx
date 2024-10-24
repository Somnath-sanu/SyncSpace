/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Link2,
  Lock,
  MoreHorizontal,
  Pencil,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { deleteDocument, getDocuments } from "@/lib/actions/room.actions";
import { useEffect, useState, useTransition } from "react";
import { Actions } from "./actions";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { getUserDetail } from "@/app/dashboard/action";
import { metadata } from "@/app/layout";
import { dateConverter } from "@/lib/utils";
import { Badge } from "./ui/badge";

import RenameModal from "./rename-modal";
import { Dialog, DialogTrigger } from "./ui/dialog";

interface Data {
  id: string;
  metadata: {
    creatorId: string;
    email: string;
    title: string;
  };
  createdAt: string;
}

export function NavMain() {
  const { isMobile } = useSidebar();

  const [allDocuments, setAllDocuments] = useState<Data[] | []>([]);

  const { user } = useUser();
  const router = useRouter();

  if (!user) router.push("/sign-in");

  async function getAllDocuments() {
    if (!user) return;
    const roomDocuments = await getDocuments(
      user.emailAddresses[0].emailAddress
    );

    setAllDocuments(roomDocuments.data);
  }

  useEffect(() => {
    if (user) {
      getAllDocuments();
    }
  }, [user]);

  const [pending, startTransaction] = useTransition();
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  /**
   * u can call server action directly into startTransaction without async await
   */

  const onDelete = async (roomId: string) => {
    try {
      await deleteDocument(roomId);
      setAllDocuments((prev) => prev.filter((p) => p.id != roomId));
    } catch (error) {
      console.log("Error deleting document from nav-main: ", error);
    }
  };

  const onCopyLink = (id: string) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/dashboard/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  function updateRoomTitle(roomId: string, title: string) {
    const updatedDocuments = allDocuments.map((doc) => {
      if (doc.id === roomId) {
        doc.metadata.title = title;
      }
      return doc;
    });
    // console.log({updatedDocuments});
    setAllDocuments(updatedDocuments);
  }

  return (
    <SidebarGroup className="">
      <SidebarMenu className="">
        {allDocuments.map(({ id, metadata, createdAt }: any) => (
          <DropdownMenu key={id}>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-col gap-0.5 items-start justify-center shadow-inner  p-2 rounded-md space-y-1 border-b border-blue-900">
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    {metadata.title}

                    <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                  <div className="flex px-2 items-end justify-end w-full text-xs">
                    <Badge className="font-semibold mr-auto  bg-gradient-to-br from-blue-400  to-blue-600 text-xs pointer-events-none shadow-sm">
                      {dateConverter(createdAt)}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                side={isMobile ? "bottom" : "right"}
              >
                <DropdownMenuItem
                  className="p-3 cursor-pointer"
                  onClick={() => onCopyLink(id)}
                >
                  <Link2 className="h-4 w-4 mr-2 " />
                  Copy board link
                </DropdownMenuItem>

                <Dialog
                  open={isRenameOpen}
                  onOpenChange={setIsRenameOpen}
                  disabled={user?.id !== metadata.creatorId}
                >
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="p-0"
                      disabled={user?.id !== metadata.creatorId}
                    >
                      <Button
                        className="p-3 cursor-pointer text-sm w-full justify-start"
                        variant={"ghost"}
                        disabled={user?.id !== metadata.creatorId}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Rename
                        {user?.id !== metadata.creatorId && (
                          <Lock className="h-4 w-4 mr-2" />
                        )}
                      </Button>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <RenameModal
                    title={metadata.title}
                    roomId={id}
                    setNewDocumentTitle={updateRoomTitle}
                    onClose={() => setIsRenameOpen(false)}
                  />
                </Dialog>

                <ConfirmModal
                  header="Delete board?"
                  description="This will delete the board and all of its contents."
                  disabled={pending || user?.id !== metadata.creatorId}
                  onConfirm={() => startTransaction(() => onDelete(id))}
                >
                  <Button
                    className="p-3 cursor-pointer text-sm w-full justify-start"
                    variant={"ghost"}
                    disabled={user?.id !== metadata.creatorId}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                    {user?.id !== metadata.creatorId && (
                      <Lock className="h-4 w-4 mr-2" />
                    )}
                  </Button>
                </ConfirmModal>
              </DropdownMenuContent>
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

/**
 * when use renameModal below DropDownItem , it will close the rename model as soon as it will open
 * *this is because DropdownMenuItem has a default behavior of closing the dropdown menu when clicked.
 * thats why use onClick={(e) => e.preventDefault()}
 * But then the save button of renameModal won't work
 ** When using onSelect={(e) => e.preventDefault()} on the DropdownMenuItem, it's likely preventing all click events from propagating, including the save button in the RenameDialog.
 */
