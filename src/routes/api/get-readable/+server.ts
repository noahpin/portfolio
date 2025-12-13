import { json } from "@sveltejs/kit";
import { extract } from '@extractus/article-extractor'
import https from "https";

export async function POST({ request }) {
  let body = await request.json();
  try {
    const u =
      body.url;
    if(!u) return json ({ error: "No url provided" });
    console.log(u)
    
    const article = await extract(u, {
      descriptionLengthThreshold: 120,
      contentLengthThreshold: 500
    })
    
    console.log(article)
    
    return json(article);
    
    
  } catch (err) {
    console.log(err);
    return json({ error: err });
  }
  return json({ error: "No url provided" });
}
