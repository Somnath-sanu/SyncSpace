/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSidebar } from "@/components/app-sidebar";
import NewDocumentButton from "@/components/NewDocumentButton";
import Notifications from "@/components/Notifications";
import ThemeDialog from "@/components/ThemeDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getDocuments } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { UserButton } from "@clerk/nextjs";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "./_components/Card";
import ActionButton from "@/components/ActionButton";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard"
}

export default async function Page() {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress,
  );

  // console.log(clerkUser.emailAddresses[0].emailAddress);

  return (
    <Suspense fallback={<Loader />}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 dark">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Collaborate in realtime</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <UserButton />
              {/* <ThemeDialog /> */}
              <ActionButton side="bottom" content="Notifications">
                <Notifications />
              </ActionButton>
            </div>
          </header>
          {roomDocuments.data.length > 0 ? (
            <div className="m-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <NewDocumentButton
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
                roomDocuments={roomDocuments}
              />

              {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                <Link key={id} href={`/dashboard/${id}`}>
                  <Card metadata={metadata} id={id} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="m-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <NewDocumentButton
                roomDocuments={roomDocuments}
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
              />
            </div>
          )}
          {/* <SkeletonLoader /> */}
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}
