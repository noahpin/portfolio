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
    //get html content from supabase proxy
    const res = await fetch('https://etrdcppajdvvwigypkgm.supabase.co/functions/v1/fetch-html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: u,
      }),
    });

    if (!res.ok) {
      return json({ error: res.statusText });
    }
    const metadata = await urlMetadata(null, {
      parseResponseObject: res
    });
    return json(metadata);
  } catch (err) {
    console.log(err);
    return json({ error: err });
  }
  return json({ error: "No url provided" });
}
