import { json } from "@sveltejs/kit";
import { extractFromHtml } from "@extractus/article-extractor";
import https from "https";

export async function POST({ request }) {
  let body = await request.json();
  try {
    const u = body.url;
    if (!u) return json({ error: "No url provided" });
    console.log(u);

    const res = await fetch(
      "https://etrdcppajdvvwigypkgm.supabase.co/functions/v1/fetch-html",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: u,
        }),
      },
    );
    if (!res.ok) {
      return json({ error: res.statusText });
    }
    let html = await res.text();

    const article = await extractFromHtml(html, u, {
      descriptionLengthThreshold: 120,
      contentLengthThreshold: 500,
    });

    console.log(article);

    return json(article);
  } catch (err) {
    console.log(err);
    return json({ error: err });
  }
  return json({ error: "No url provided" });
}
