import { MiddlewareRequest } from "@netlify/next";

export async function middleware(nextRequest) {
  const pathname = nextRequest.nextUrl.pathname;

  const middlewareRequest = new MiddlewareRequest(nextRequest);

  if (pathname.startsWith("/static")) {
    const response = await middlewareRequest.next();

    const message = `This was a static page but has been transformed in 
                     ${nextRequest?.geo?.city}, 
                     ${nextRequest?.geo?.country} using 
                     @netlify/next in middleware.ts!`;

    response.replaceText("#message", message);
    response.setPageProp("message", message);

    return response;
  }
}
