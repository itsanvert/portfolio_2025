import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId && typeof window === "undefined") {
  console.warn("Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
}

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-03-13",
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
  ignoreBrowserTokenWarning: true,
});

export async function fetchSanityData<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!projectId) {
    console.warn("Sanity project ID not configured, skipping fetch.");
    return null;
  }

  try {
    const data = await client.fetch<T>(query, params, { 
      // Revalidate every 60 seconds
      next: { revalidate: 60 } 
    });
    return data ?? null;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
