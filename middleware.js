import { MiddlewareRequest } from "@netlify/next";
import customPricing from "./data/customPricing.json";
import { getParamByISO } from "iso-country-currency";
import posts from "./data/posts.json";

const COOKIE_NAME = "ab-test";

// Choose a random bucket
// Optional: contact a 3rd party service to get the user's bucket

export const middleware = async (nextRequest) => {
  const MARKETING_BUCKETS = ["a", "b"];
  const getBucket = () =>
    MARKETING_BUCKETS[Math.floor(Math.random() * MARKETING_BUCKETS.length)];
  const pathname = nextRequest.nextUrl.pathname;

  const middlewareRequest = new MiddlewareRequest(nextRequest);

  const response = await middlewareRequest.next();

  //AB Test cookie setup
  const bucket = nextRequest.cookies.get(COOKIE_NAME) || getBucket();

  // Add the bucket to cookies if it's not there
  if (!nextRequest.cookies.get(COOKIE_NAME)) {
    response.cookies.set(COOKIE_NAME, bucket);
  }

  // const hasCookieConsent = request.cookies.get("cookieConsentGiven");
  // if (hasCookieConsent) {
  //   response.setPageProp("cookieConsentGiven", true);
  //   response.rewriteHTML("#cookie-banner", {
  //     element(e) {
  //       e.remove();
  //     },
  //   });

  //Change background colour on homepage based of A/B

  if (pathname == "/") {
    if (bucket === "b") {
      response.rewriteHTML("#main-body", {
        element(element) {
          element.setAttribute("style", "background-color:black; color:white");
        },
      });
      response.rewriteHTML("#hero-image", {
        element(element) {
          element.setAttribute(
            "src",
            "https://images.unsplash.com/photo-1549082984-1323b94df9a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
          );
        },
      });
    }
    return response;
  }

  if (pathname.startsWith("/static")) {
    const message = `This was a static page but has been transformed in 
                     ${nextRequest?.geo?.city}, 
                     ${nextRequest?.geo?.country} using 
                     @netlify/next in middleware.ts!`;
    response.replaceText("#message", message);
    response.setPageProp("message", message);

    return response;
  }

  if (pathname.startsWith(`/pricing`)) {
    const customerId = middlewareRequest.nextUrl.searchParams.get("id");
    const currencyOverride =
      middlewareRequest.nextUrl.searchParams.get("country");
    let item = customPricing.find((price) => price.id == customerId);
    let country = currencyOverride ? currencyOverride : nextRequest.geo.country;
    let currency = getParamByISO(country, "symbol");

    if (item) {
      for (let i = 0; i < item.pricing.length; i++) {
        response.replaceText(
          `#sku${i + 1}-name`,
          item.pricing[i].name.toString()
        );
        response.replaceText(
          `sku${i + 1}-price`,
          item.pricing[i].price.toString()
        );
      }
      response.setPageProp("heroText", item.heroText);
      response.replaceText("#hero-text", item.heroText);
      response.setPageProp("currency", currency);
      response.replaceText("#currency", currency);
      response.setPageProp("pricing", item.pricing);

      return response;
    }
  }

  if (pathname.startsWith("/blog/")) {
    const searchText = middlewareRequest.nextUrl.searchParams.get("searchText");
    if (searchText) {
      response.setPageProp("title", searchText);
      response.replaceText("#title", searchText);
      return response;
    }
  }

  if (pathname.startsWith("/blog")) {
    const cookie = nextRequest.cookies.get("mostViewed");

    let mostViewed = JSON.parse(cookie ? cookie : null);

    if (mostViewed) {
      let mostViewedPosts = posts.filter((post) =>
        mostViewed.some((postViews) => `/blog/${postViews.name}` === post.href)
      );

      response.setPageProp("mostViewed", mostViewedPosts);
      return response;
    }
  }

  if (pathname.startsWith("/store")) {
    const cityParam = middlewareRequest.nextUrl.searchParams.get("city");
    let city;
    if (cityParam) {
      city = cityParam;
    } else if (nextRequest.geo) {
      city = nextRequest.geo.city;
    }

    if (city) {
      const res = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "a9cc9ec26bmsh63a61406bf323dcp1d9f0bjsn91a15a8371bf",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();

      let title;

      if (data.current.temp_c) {
        if (data.current.temp_c > 15) {
          title = `Its ${data.current.temp_c} degrees celcius in ${city}, hopefully these will keep you cool!`;

          response.setPageProp("temp", "hot");
        } else {
          title = `Its only ${data.current.temp_c} degrees celcius in ${city} you better wrap up warm!`;
          response.setPageProp("temp", "cold");
        }
        response.setPageProp("listTitle", title);
        response.replaceText("#list-title", title);
      }
      console.log("This function has been called");

      return response;
    }
  }
};
