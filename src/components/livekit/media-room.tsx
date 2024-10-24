/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  roomId: string;
  video: boolean;
  audio: boolean;
}

export default function MediaRoom({ roomId, video, audio }: MediaRoomProps) {
  const { user } = useUser();

  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) {
      return;
    }

    const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        const res = await fetch(`/api/livekit?room=${roomId}&username=${name}`);
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.firstName, user?.lastName, roomId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="size-8 animate-spin my-4" />
        <p className="text-xs">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      style={{ height: "100dvh" }}
    >
      <VideoConference />
      <RoomAudioRenderer />

      <ControlBar />
    </LiveKitRoom>
  );
}
