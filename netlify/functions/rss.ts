import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-12-03",
});

export async function handler(event, context) {
  try {
    const posts = await sanityClient.fetch(`
      *[_type == "blog" && _createdAt < now()] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        excerpt,
        _createdAt,
      }
    `);

    const items = posts
      .map(
        (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>https://jmss-dev.netlify.app/blog/${post.slug}</link>
        <pubDate>${new Date(post._createdAt).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt || ""}]]></description>
      </item>
    `
      )
      .join("");

    const xml = `
      <rss version="2.0">
        <channel>
          <title>JMSS Blog Site</title>
          <link>https://jmss-dev.netlify.app</link>
          <description>JMSS Blog Site</description>
          ${items}
        </channel>
      </rss>
    `.trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/xml" },
      body: xml,
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Error generating RSS feed" };
  }
}
