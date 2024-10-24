"use client";

import Theme from "./plugins/Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import React, { useState } from "react";

import {
  liveblocksConfig,
  useEditorStatus,
  FloatingComposer,
  FloatingThreads,
  LiveblocksPlugin,
} from "@liveblocks/react-lexical";
import { DeleteModal } from "../DeleteModal";
import { useThreads } from "@liveblocks/react/suspense";
import Loader from "../Loader";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import Comments from "../Comments";
import { useUser } from "@clerk/nextjs";
import ActionButton from "../ActionButton";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({
  roomId,
  currentUserType,
  roomMetadata,
}: {
  roomId: string;
  currentUserType: UserType;
  roomMetadata: RoomMetadata;
}) {
  const status = useEditorStatus();
  const { threads } = useThreads();
  const { user } = useUser();

  const initialConfig = liveblocksConfig({
    namespace: "Editor",
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === "editor",
  });

  const [open, setOpen] = useState(false);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="z-50 custom-scrollbar w-screen overflow-auto border-y border-dark-300 bg-dark-100 pl-3 pr-4 shadow-sm flex min-w-full justify-between">
          <ToolbarPlugin />
          {user?.id === roomMetadata.creatorId && ( //TODO: only room creator can delete fix this
            <ActionButton content="Delete document" side="bottom">
              <DeleteModal
                roomId={roomId}
                setOpen={() => setOpen(!open)}
                open={open}
              />
            </ActionButton>
          )}
        </div>

        <div className="custom-scrollbar h-[calc(100vh-140px)] gap-5 overflow-auto px-5 pt-5 lg:flex-row lg:items-start lg:justify-center  xl:gap-10 xl:pt-10 flex flex-col items-center justify-start">
          {status === "not-loaded" || status === "loading" ? (
            <Loader />
          ) : (
            <div className="editor-inner min-h-[1100px]  relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {currentUserType === "editor" && <FloatingToolbarPlugin />}
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          )}

          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]" />
            <FloatingThreads threads={threads} />
            <Comments />
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}
