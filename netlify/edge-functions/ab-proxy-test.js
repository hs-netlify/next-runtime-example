import { parseHTML } from "https://esm.sh/linkedom";
import { assert } from "https://deno.land/std@0.188.0/testing/asserts.ts";

const COOKIE_NAME = "ab-test";

export default async (request, context) => {
  const MARKETING_BUCKETS = ["a", "b"];
  const getBucket = () =>
    MARKETING_BUCKETS[Math.floor(Math.random() * MARKETING_BUCKETS.length)];
  const bucket = context.cookies.get(COOKIE_NAME) || getBucket();
  if (!context.cookies.get(COOKIE_NAME)) {
    context.cookies.set({ name: COOKIE_NAME, value: bucket });
  }
  let proxyResponse;
  const url = new URL(request.url);
  const baseUrl = url.origin;
  console.log("url");
  if (bucket === "a") {
    proxyResponse = await fetch(`${baseUrl}/`);
  } else if (bucket === "b") {
    proxyResponse = await fetch(`${baseUrl}/test-b/`);
  } else {
    return;
  }
  return new Response(proxyResponse.body, proxyResponse);
};

export const config = { path: "/test" };
