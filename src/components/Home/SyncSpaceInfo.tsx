import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Zap, Shield, Palette, Share2, Bell } from "lucide-react";

export default function SyncSpaceInfo() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      {/* <div className="mb-6 text-center">
        <h2 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
          Welcome to SyncSpace
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your real-time collaborative workspace
        </p>
      </div> */}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Real-Time Collaboration</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>Work together with your team in real-time</li>
              <li>See live cursors and edits from collaborators</li>
              <li>No more version conflicts or file syncing issues</li>
              <li>Perfect for remote teams and distributed workflows</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-green-500" />
              <span>Smart Sharing Controls</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Granular access controls - Viewer, Editor, and Admin roles
              </li>
              <li>Share documents with specific team members</li>
              <li>Invite collaborators via email</li>
              <li>Easy document access management</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Instant Updates</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>Changes sync instantly across all devices</li>
              <li>Real-time notifications for document updates</li>
              <li>Automatic saving - never lose your work</li>
              <li>Seamless offline to online transitions</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              <span>Security & Privacy</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>End-to-end encryption for your data</li>
              <li>Secure authentication via Clerk</li>
              <li>Private workspaces for your team</li>
              <li>Regular security updates and monitoring</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-500" />
              <span>Smart Notifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>Real-time notifications for document shares</li>
              <li>Get notified when collaborators make changes</li>
              <li>Custom notification preferences</li>
              <li>Email notifications for important updates</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-orange-500" />
              <span>Modern Interface</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>Clean and intuitive user interface</li>
              <li>Dark mode support</li>
              <li>Responsive design for all devices</li>
              <li>Customizable workspace layout</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
