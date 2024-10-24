/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Loader from "./Loader";
import ActiveCollaborators from "./ActiveCollaborators";
import { Input } from "./ui/input";

import { updateDocument } from "@/lib/actions/room.actions";
import ShareModal from "./ShareModal";
import { z } from "zod";
import { toast } from "sonner";
import MediaRoom from "./livekit/media-room";
import { AudioButton } from "./AudioButton";
import { Brain, Pencil } from "lucide-react";
import ActionButton from "./ActionButton";
import { Button } from "./ui/button";
import AiDialog from "./ai/ai-dialog";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
  audio,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState<string>(
    roomMetadata.title,
  );
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const titleSchema = z.string().min(3).max(20);

  const { user } = useUser();

  // console.log({ audio });

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const { success } = titleSchema.safeParse(documentTitle);
      if (!success) {
        toast.error("Enter a valid title");
        setDocumentTitle(roomMetadata.title);
        return;
      }

      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) {
            setEditing(false);
            toast.success("Updated");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = async (e: MouseEvent) => {
      // console.log(e.target as Node); //DOM element like div , input ...

      const { success } = titleSchema.safeParse(documentTitle);
      if (!success) {
        toast.error("Enter a valid title");
        setDocumentTitle(roomMetadata.title);
        return;
      }

      if (
        containerRef.current &&
        !(containerRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roomId, documentTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        {audio ? (
          <MediaRoom roomId={roomId} audio={true} video={false} />
        ) : (
          <div className="flex size-full max-h-screen flex-1 flex-col items-center overflow-hidden">
            <Header>
              <div
                ref={containerRef}
                className="flex w-fit items-center justify-center gap-2"
              >
                {editing && !loading ? (
                  <Input
                    type="text"
                    value={documentTitle}
                    //@ts-ignore
                    ref={inputRef}
                    placeholder="Enter title"
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={(e) => updateTitleHandler(e)}
                    disabled={!editing || loading}
                    className="min-w-[78px] flex-1 border-none bg-transparent px-0 text-left text-base font-semibold leading-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-black sm:text-xl md:text-center"
                  />
                ) : (
                  <>
                    <p className="border-dark-400 line-clamp-1 text-base font-semibold leading-[24px] sm:pl-0 sm:text-xl">
                      {documentTitle}
                    </p>
                  </>
                )}

                {user?.id === roomMetadata.creatorId && !editing && (
                  <ActionButton
                    side="bottom"
                    content="Rename document"
                    sideOffset={10}
                  >
                    <Pencil
                      onClick={() => setEditing(true)}
                      className="pointer size-4 cursor-pointer"
                    />
                  </ActionButton>
                )}

                {currentUserType !== "editor" && !editing && (
                  <p className="bg-dark-400/50 rounded-md px-2 py-0.5 text-xs text-blue-100/50">
                    View only
                  </p>
                )}

                {loading && <p className="text-sm text-gray-400">saving...</p>}
              </div>
              <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                <AiDialog>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <ActionButton side="bottom" content="AI" sideOffset={15}>
                      <Brain className="h-5 w-5" />
                    </ActionButton>
                  </Button>
                </AiDialog>
                <ActiveCollaborators />
                <ActionButton side="bottom" content="Audio room">
                  <AudioButton />
                </ActionButton>

                <ShareModal
                  roomId={roomId}
                  collaborators={users}
                  creatorId={roomMetadata.creatorId}
                  currentUserType={currentUserType}
                />

                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </Header>

            <Editor
              roomId={roomId}
              currentUserType={currentUserType}
              roomMetadata={roomMetadata}
            />
          </div>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
