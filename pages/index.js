import NavBar from "../components/navBar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  let randNumber = Math.ceil(Math.random() * 5);
  const handleABSwitch = () => {
    let bucket = Cookies.get("ab-test");
    Cookies.set("ab-test", bucket === "a" ? "b" : "a");
    router.reload(window.location.pathname);
  };
  return (
    <div id="main-body" className="h-min-screen  overflow-hidden">
      <a
        onClick={handleABSwitch}
        className="fixed text-center bottom-10 w-48 z-50 bg-indigo-600 hover:bg-indigo-700 rounded text-white  p-2 text-large cursor-pointer left-10"
      >
        Switch A/B Test!
      </a>

      <NavBar />
      <main className="lg:relative h-full">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-32 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">
                Unlock the power of your site with
              </span>
              <br />
              <span className="block text-indigo-600 xl:inline">
                Next.js Advanced Middleware
              </span>
            </h1>
            <p className="mx-auto mt-20 max-w-md text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              <span className="font-bold ">Example 1:</span> Create a custom
              pricing page on the fly by providing a unique link to each
              customer.
              <br />
            </p>
            <div className="flex mt-4">
              <div className="rounded-md shadow">
                <a
                  className="flex w-48 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  href={`/pricing?id=${randNumber}`}
                >
                  Try it out
                </a>
              </div>
            </div>

            <p className="mx-auto mt-20 max-w-md text-xl  sm:text-xl md:mt-5 md:max-w-3xl">
              <span className="font-bold">Example 2:</span> Change the products
              in your store based on the weather of the location of the request.
              <br />
            </p>
            <div className="flex mt-4">
              <div className="rounded-md shadow">
                <a
                  className="flex  w-48 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  href={`/store`}
                >
                  Try it out
                </a>
              </div>
            </div>

            <p className="mx-auto mt-20 max-w-md text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              <span className="font-bold">Example 3:</span> Track the most
              viewed blogs and inject them into the page.
              <br />
            </p>
            <div className="flex mt-4">
              <div className="rounded-md shadow">
                <a
                  className="flex w-48 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  href={`/blog`}
                >
                  Try it out
                </a>
              </div>
            </div>

            <p className="mx-auto mt-20 max-w-md text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              <span className="font-bold">Example 4:</span> Custom content in a
              blog based on your search match.
              <br />
            </p>
            <div className="flex mt-4">
              <div className="rounded-md shadow">
                <a
                  className="flex w-48 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  href={`/search`}
                >
                  Try it out
                </a>
              </div>
            </div>

            <div className="mt-10 sm:flex sm:justify-center ">
              <div className="mt-3 rounded-md shadow sm:mt-0">
                <a
                  href="https://www.netlify.com/enterprise/contact/"
                  className="flex  items-center justify-center w-48 rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <img
            id="hero-image"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
