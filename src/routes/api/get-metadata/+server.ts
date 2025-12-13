import { json } from "@sveltejs/kit";
import urlMetadata from "url-metadata";
import https from "https";

export async function POST({ request }) {
  let body = await request.json();
  try {
    const u =
      body.url;
    if(!u) return json ({ error: "No url provided" });
    
    const agent = new https.Agent({
      keepAlive: true,
      maxSockets: 50,
    });

    const metadata = await urlMetadata(u, {
      agent: agent,
      requestHeaders: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    return json(metadata);
  } catch (err) {
    console.log(err);
    return json({ error: err });
  }
  return json({ error: "No url provided" });
}
