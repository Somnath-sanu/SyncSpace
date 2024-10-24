/* eslint-disable @typescript-eslint/no-unused-vars */
import CollaborativeRoom from "@/components/CollaborativeRoom";
import Loader from "@/components/Loader";

import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";

import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Page = async ({
  params: { id },
  searchParams: { audio },
}: SearchParamProps) => {
  const clerkUser = await currentUser();

  if (!currentUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser?.emailAddresses[0].emailAddress as string,
  });

  // console.log({room});

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);

  const users = await getClerkUsers({ userIds });

  // console.log({
  //   userIds,
  //   users,
  // });

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType = room.usersAccesses[
    clerkUser?.emailAddresses[0].emailAddress as string
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex size-full max-h-screen flex-1 flex-col items-center overflow-hidden">
      <Suspense fallback={<Loader />}>
        <CollaborativeRoom
          roomId={id}
          roomMetadata={room.metadata}
          users={usersData}
          currentUserType={currentUserType}
          audio={audio}
        />
      </Suspense>
    </main>
  );
};

export default Page;
