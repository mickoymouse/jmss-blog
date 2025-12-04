import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

interface RequestBody {
  email: string;
}

interface BrevoResponse {
  id?: string;
  code?: string;
  message?: string;
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { email } = body;
  if (!email) {
    return { statusCode: 400, body: "Email is required" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [2], // your list ID
      }),
    });

    const data: BrevoResponse = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
