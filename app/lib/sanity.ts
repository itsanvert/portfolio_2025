import { createClient } from "next-sanity";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-13",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
  ignoreBrowserTokenWarning: true,
  withCredentials: true,
});

// Helper function to handle Sanity queries with error handling
export async function fetchSanityData<T>(query: string): Promise<T> {
  try {
    const data = await client.fetch<T>(
      query,
      {},
      {
        next: { revalidate: 30 },
        cache: "no-store",
      }
    );

    if (!data) {
      throw new Error("No data returned from Sanity");
    }

    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw new Error("Failed to fetch data from Sanity");
  }
}
