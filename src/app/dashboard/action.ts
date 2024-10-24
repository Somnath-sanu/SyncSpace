"use server";

import { parseStringify } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

export async function getUserDetail(id: string) {
  const user = await clerkClient().users.getUser(id);
  return parseStringify(user);
}

/**
 * Clerk's user object may contain properties like functions, symbols, or circular references, which are not serializable by default in Next.js.
 * 
 * When data is passed from a server action to a client component, Next.js attempts to serialize it into JSON. If the data contains non-serializable values, such as methods or special types, this can throw an error like "TypeError: Converting circular structure to JSON" or "Unable to serialize object".
 * 
 *  By using JSON.stringify(), you are converting the object into a plain JSON string, which only includes serializable properties (like numbers, strings, arrays, and plain objects). Non-serializable properties like functions or special data types are removed in the process.
 * JSON.parse() then converts this JSON string back into a plain JavaScript object, which can be safely passed to client components because it only contains serializable data.
 * 
 * Instead of serializing the entire user object, a more efficient approach could be to extract just the fields you need and send them to the client. This ensures you avoid unnecessary data stripping and improve performance.


export async function getUserDetails() {
  const user = await currentUser();

  // Extract only the necessary fields
  return {
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}
 */
