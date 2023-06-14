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

  const response = await context.next();

  const page = await response.text();

  const { document } = parseHTML(page);
  assert(document);

  if (bucket === "b") {
    document
      .getElementById("main-body")
      .setAttribute("style", "background-color:black; color:white");
    document.getElementById("hero-image").src =
      "https://images.unsplash.com/photo-1549082984-1323b94df9a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80";
  }

  const url = new URL(request.url);

  return new Response(
    "<html>" + document.documentElement.innerHTML + "</html>",
    response
  );
};

export const config = { path: "/test" };
