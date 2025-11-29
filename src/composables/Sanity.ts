import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: import.meta.env.MODE === "production",
  apiVersion: "v2025-11-27",
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);
