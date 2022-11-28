import { MiddlewareRequest } from "@netlify/next";
import { NextResponse } from "next/server";

let customPricing = [
  {
    name: "e-commerce",
    pricing: [
      { name: "Personal Store", price: 500 },
      { name: "Business Store", price: 1000 },
      { name: "Enterprise Store", price: 5000 },
    ],
  },
  {
    name: "web-app",
    pricing: [
      { name: "Growth", price: 100 },
      { name: "Business", price: 3000 },
      { name: "Enterprise", price: 5000 },
    ],
  },
  {
    name: "marketing",
    pricing: [
      { name: "Pro", price: 100 },
      { name: "Scale", price: 1000 },
      { name: "Business", price: 3000 },
    ],
  },
];

export const middleware = async (nextRequest) => {
  const pathname = nextRequest.nextUrl.pathname;

  const middlewareRequest = new MiddlewareRequest(nextRequest);

  const response = await middlewareRequest.next();

  // const hasCookieConsent = request.cookies.get("cookieConsentGiven");
  // if (hasCookieConsent) {
  //   response.setPageProp("cookieConsentGiven", true);
  //   response.rewriteHTML("#cookie-banner", {
  //     element(e) {
  //       e.remove();
  //     },
  //   });

  if (pathname.startsWith("/static")) {
    const message = `This was a static page but has been transformed in
                     ${nextRequest?.geo?.city},
                     ${nextRequest?.geo?.country} using
                     @netlify/next in middleware.ts!`;

    response.replaceText("#message", message);
    response.setPageProp("message", message);

    return response;
  }

  // customPricing.foreach((item) => {
  //   if (pathname.startsWith(`/use-case/${item.name}`)) {
  //     response.setPageProps("pricing", item.pricing);

  //     for (let i = 0; i < item.pricing.length; i++) {
  //       response.replaceText(`#sku${i + 1}-name`, item.pricing[i].name);
  //       response.replaceText(`#sku${i + 1}-price`, item.pricing[i].price);
  //     }

  //     return response;
  //   }
  // });

  if (pathname.startsWith("/marketing")) {
    return response;
  }

  if (pathname.startsWith("/shop")) {
    return response;
  }

  if (pathname.startsWith("/app")) {
    return response;
  }
  // }
};
