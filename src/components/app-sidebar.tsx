import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getDocuments } from "@/lib/actions/room.actions"



export async function AppSidebar({  ...props }: React.ComponentProps<typeof Sidebar>) {

  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );


  return (
    <Sidebar {...props} className="">
      <SidebarHeader>
        <SidebarMenu className="">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documents</span>
                  <span className=""></span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain/>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm roomDocuments={roomDocuments}/>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
