import BgGradient from "@/components/Home/BgGradient";
import Feedback from "@/components/Home/Feedback";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Feedback"
}

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <main className="relative w-full min-w-0 gap-5 bg-black">
      <BgGradient stars={150}>
        <Feedback />
      </BgGradient>
    </main>
  );
}
