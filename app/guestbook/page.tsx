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

export default async function GuestbookPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const entries = await getGuestBrookEntry();
  return (
    <div className="max-w-7xl w-full px-4 md:px-8 mx-auto ">
      <GuestbookClient user={user} entries={entries} />
      <Footer />
    </div>
  );
}
