/* eslint-disable @next/next/no-img-element */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import GuestbookClient from "./GuestbookClient";
import { unstable_noStore as noStore } from "next/cache";
import { Footer } from "../components/Footer";

async function getGuestbookEntries() {
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

export default async function GuestbookPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const entries = await getGuestbookEntries();

  return (
    <div className="min-h-screen flex flex-col">
      <GuestbookClient user={user} entries={entries} />
    </div>
  );
}
