/* eslint-disable @next/next/no-img-element */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import GuestbookClient from "./GuestbookClient";
import { unstable_noStore as noStore } from "next/cache";
import { Footer } from "../components/Footer";

async function getGuestBrookEntry() {
  noStore();
  const data = await prisma.guestBookEntry.findMany({
    select: {
      User: {
        select: {
          firstname: true,
          profileimage: true,
        },
      },
      message: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });
  return data;
}

export default function GuestbookPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Guestbook</h1>
      {/* Add your guestbook content here */}
    </div>
  );
}
