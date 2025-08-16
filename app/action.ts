// app/action.ts
"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function postData(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const message = formData.get("message") as string;

  // Validate message
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    throw new Error("Message is required and must be a non-empty string");
  }

  try {
    const data = await prisma.guestBookEntry.create({
      data: {
        userId: user.id,
        message: message.trim(),
      },
    });

    revalidatePath("/guestbook");

    return { success: true, data };
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    throw new Error("Failed to create guestbook entry");
  }
}
