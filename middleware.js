import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { MiddlewareRequest } from "@netlify/next";
// import cities from "./data/cities.json";

let customPricing = [
  {
    name: "e-commerce",
    pricing: [
      { name: "Personal Store", price: 500 },
      { name: "Business Store", price: 2000 },
      { name: "Enterprise Store", price: 5000 },
    ],
    heroText: "Awesome plans to suit any size store.",
  },
  {
    name: "web-app",
    pricing: [
      { name: "Growth", price: 100 },
      { name: "Business", price: 3000 },
      { name: "Enterprise", price: 6000 },
    ],
    heroText: "Run your web app at scale, priced to suit your needs.",
  },
  {
    name: "marketing",
    pricing: [
      { name: "Pro", price: 100 },
      { name: "Scale", price: 1000 },
      { name: "Business", price: 3000 },
    ],
    heroText:
      "Lightening fast speeds and the best price for your Marketing Site",
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

  for (let item of customPricing) {
    if (pathname.startsWith(`/use-case/${item.name}`)) {
      for (let i = 0; i < item.pricing.length; i++) {
        response.replaceText(
          `#sku${i + 1}-name`,
          item.pricing[i].name.toString()
        );
        response.replaceText(
          `#sku${i + 1}-price`,
          item.pricing[i].price.toString()
        );
      }
      response.setPageProp("heroText", item.heroText);
      response.replaceText("#hero-text", item.heroText);

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

  if (pathname.startsWith("/store")) {
    const cityParam = middlewareRequest.nextUrl.searchParams.get("city");
    let city;
    if (cityParam) {
      city = cityParam;
    } else if (nextRequest.geo) {
      city = nextRequest.geo.city;
    }

    console.log(city);

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

      return response;
    }
  }
};
