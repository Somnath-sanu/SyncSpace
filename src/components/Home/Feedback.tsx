"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EmailTemplate } from "../email/email-template";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import FormSubmitButton from "./FormSubmitButton";

const formSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
});

const handleSubmit = async (formData: FormData): Promise<void> => {
  "use server";

  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const values = Object.fromEntries(formData.entries());
  // console.log(values);

  try {
    const parsedValues = formSchema.parse(values);
    const { feedback } = parsedValues;
    const fullName = `${user.firstName} ${user.lastName}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "somnathmishra100dbi@gmail.com",
      subject: "Feedback Received",
      react: EmailTemplate({
        fullName,
        email: user.emailAddresses[0].emailAddress as string,
        feedback,
      }),
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/feedback");
  } catch (error) {
    console.log("Error sending email :", error);
    throw error;
  }

  redirect("/");
};

/**
 * Make server action function seperated from the component
 * Always use redirect after try-catch , as it throw error internally
 */

export default async function Feedback() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
    throw new Error("User not authenticated");
  }

  return (
    <div className="min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="animate-fade-in mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold">We Value Your Feedback</h1>
          <p className="text-xl text-gray-400">
            Help us improve your experience
          </p>
        </div>

        <div className="animate-slide-up relative overflow-hidden rounded-lg bg-white/5 p-8 shadow-xl">
          <form action={handleSubmit}>
            <div className="animate-fade-in relative z-10 space-y-6">
              <Label
                htmlFor="feedback"
                className="mb-2 block text-lg font-medium"
              >
                Your Feedback
              </Label>
              <Textarea
                name="feedback"
                id="feedback"
                className="w-full resize-none border bg-transparent outline-none transition-all duration-300"
                autoFocus
                rows={4}
                placeholder="Tell us what you think..."
                minLength={1}
                required
              />

              <FormSubmitButton className="w-full">
                Submit Feedback
              </FormSubmitButton>
            </div>
          </form>
        </div>

        <div className="animate-fade-in mt-8 text-center text-gray-400">
          <p>Your feedback helps us create a better experience for everyone.</p>
          <p>Thank you for your time!</p>
        </div>
      </div>
    </div>
  );
}
