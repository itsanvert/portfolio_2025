import { NextResponse } from "next/server";
import { client } from "../../lib/sanity";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const query = `*[_type == 'project'] | order(_createdAt desc) {
      title,
      _id,
      link,
      demoLink,
      sourceLink,
      description,
      tags,
      "imageUrl": image.asset->url
    }`;

    // Pass token explicitly for server-side if present
    const fetchOptions = {
      ...(process.env.NEXT_PUBLIC_SANITY_TOKEN && {
        token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
      }),
    };

    const data = await client.withConfig(fetchOptions).fetch(query, {}, { cache: "no-store" });
    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
