import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import NavBar from "../../components/navBar";

const plan1Features = [
  "Pariatur quod similique",
  "Sapiente libero doloribus",
  "Vel ipsa esse repudiandae",
];

const plan2Features = [
  "Quia rem est sed impedit magnam",
  "Dolorem vero ratione voluptates",
  "Qui sed ab doloribus voluptatem dolore",
  "Laborum commodi molestiae id et fugiat",
  "Nam ut ipsa nesciunt culpa modi dolor",
];
const plan3Features = [
  "Pariatur quod similique",
  "Sapiente libero doloribus",
  "Vel ipsa esse repudiandae",
];

export const getStaticProps = async () => {
  let defaultPricing = [
    {
      name: "Hobby",
      price: 79,
    },
    {
      name: "Growth",
      price: 149,
    },
    {
      name: "Scale",
      price: 349,
    },
  ];
  return {
    props: {
      pricing: defaultPricing,
      heroText: null,
      currency: "$",
    },
  };
};

const UseCase = ({ pricing, heroText, currency }) => {
  const [highlight, setHighlight] = useState(false);
  const [customerId, setCustomerId] = useState();

  useEffect(() => {
    let randomId = Math.ceil(Math.random() * 5);
    setCustomerId(randomId);
  }, []);

  const toggleHighlight = () => {
    highlight ? setHighlight(false) : setHighlight(true);
  };
  const showHighlight = highlight
    ? "absolute w-full h-full flex items-end justify-center p-20 z-10 bg-black bg-opacity-80"
    : "hidden";
  return (
    <div>
      <NavBar />

      <div className="bg-gray-900 relative">
        <div className={showHighlight}>
          <div className="bg-white max-w-[800px] w-1/2 text-center fixed bottom-24 m-auto  rounded p-4">
            Editing the hero text and pricing plans of a static page based on
            custom user id. When linked to a CRM links can be sent to customers
            providing their own bespoke pricing through edge functions
          </div>
        </div>
        {highlight ? (
          <button
            className="fixed bottom-24 w-48 z-50 bg-indigo-600 hover:bg-indigo-700  rounded text-white  p-2 text-large cursor-pointer left-10"
            onClick={toggleHighlight}
          >
            Hide Customisation
          </button>
        ) : (
          <button
            className="fixed bottom-24 w-48 z-50 bg-indigo-600 hover:bg-indigo-700  rounded text-white  p-2 text-large cursor-pointer left-10"
            onClick={toggleHighlight}
          >
            Show Customisation
          </button>
        )}
        <a
          href={`/pricing?id=${customerId}`}
          className="fixed text-center bottom-10 w-48 z-50 bg-indigo-600 hover:bg-indigo-700 rounded text-white  p-2 text-large cursor-pointer left-10"
        >
          Random Customer
        </a>

        <div className="px-4 pt-24 sm:px-6 lg:px-8 lg:pt-24">
          <div className="text-center">
            <h2 className="text-xl font-semibold leading-6 text-gray-300">
              Pricing
            </h2>
            <p className="mt-2  text-3xl font-bold  tracking-tight  text-white sm:text-4xl lg:text-5xl">
              <span id="hero-text" className="bg-gray-900 relative z-30">
                {heroText
                  ? heroText
                  : " The right price for you, whoever you are"}
              </span>
            </p>
            <p className="mx-auto mt-3 max-w-4xl text-xl text-gray-300 sm:mt-5 sm:text-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              numquam eligendi quos odit doloribus molestiae voluptatum.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
          <div className="relative ">
            <div className="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-7">
                <div className="mx-auto max-w-md lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:mx-0 lg:max-w-none">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-l-lg">
                    <div className="flex flex-1 flex-col">
                      <div className="bg-white px-6 py-10">
                        <div>
                          <h3
                            className="text-center text-2xlfont-medium bg-white z-30 relative text-gray-900"
                            id="sku1-name"
                          >
                            {pricing[0].name}
                          </h3>
                          <div className="mt-4 flex items-center justify-center">
                            <span className="flex items-start px-3 text-6xl tracking-tight text-gray-900">
                              <span
                                id="currency"
                                className="mt-2 mr-2 z-30  bg-white text-4xl font-medium tracking-tight"
                              >
                                {currency}
                              </span>
                              <span
                                id="sku1-price"
                                className="font-bold z-30  bg-white"
                              >
                                {pricing[0].price}
                              </span>
                            </span>
                            <span className="text-xl font-medium text-gray-500">
                              /month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
                        <ul role="list" className="space-y-4">
                          {plan1Features.map((feature) => (
                            <li key={feature} className="flex items-start ">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 flex-shrink-0 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base font-medium text-gray-500">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <a
                              href="#"
                              className="block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-indigo-600 hover:bg-gray-50"
                              aria-describedby="tier-hobby"
                            >
                              Start your trial
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-10 max-w-lg lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none">
                  <div className="relative rounded-lg shadow-xl">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-0 translate-y-px transform">
                      <div className="flex -translate-y-1/2 transform justify-center">
                        <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-base font-semibold text-white">
                          Most popular
                        </span>
                      </div>
                    </div>
                    <div className="rounded-t-lg bg-white px-6 pt-12 pb-10">
                      <div className="px-20">
                        <h3
                          id="sku2-name"
                          className="text-center z-30 relative bg-white text-3xl font-semibold tracking-tight text-gray-900 sm:-mx-6"
                        >
                          {pricing[1].name}
                        </h3>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="flex items-start px-3 text-6xl tracking-tight text-gray-900 sm:text-6xl">
                            <span
                              id="currency"
                              className="mt-2 mr-2 z-30  bg-white text-4xl font-medium tracking-tight"
                            >
                              {currency}
                            </span>
                            <span
                              className="font-bold z-30 bg-white"
                              id="sku2-price"
                            >
                              {pricing[1].price}
                            </span>
                          </span>
                          <span className="text-2xl font-medium text-gray-500">
                            /month
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-b-lg border-t-2 border-gray-100 bg-gray-50 px-6 pt-10 pb-8 sm:px-10 sm:py-10">
                      <ul role="list" className="space-y-4">
                        {plan2Features.map((feature) => (
                          <li key={feature} className="flex z-30 items-start">
                            <div className="flex-shrink-0 ">
                              <CheckIcon
                                className="h-6 w-6 flex-shrink-0 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base  font-medium  text-gray-500">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <div className="rounded-lg shadow-md">
                          <a
                            href="#"
                            className="block w-full rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-center text-xl font-medium leading-6 text-white hover:bg-indigo-700"
                            aria-describedby="tier-growth"
                          >
                            Start your trial
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-10 max-w-md lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 lg:m-0 lg:max-w-none">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg">
                    <div className="flex flex-1 flex-col">
                      <div className="bg-white px-6 py-10">
                        <div>
                          <h3
                            className="text-center text-2xl bg-white relative z-30 font-medium text-gray-900"
                            id="sku3-name"
                          >
                            {pricing[2].name}
                          </h3>
                          <div className="mt-4 flex items-center justify-center">
                            <span className="flex items-start px-3 text-6xl tracking-tight text-gray-900">
                              <span
                                id="currency"
                                className="mt-2 mr-2 z-30  bg-white text-4xl font-medium tracking-tight"
                              >
                                {currency}
                              </span>
                              <span
                                className="font-bold bg-white z-30"
                                id="sku3-price"
                              >
                                {pricing[2].price}
                              </span>
                            </span>
                            <span className="text-xl font-medium text-gray-500">
                              /month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
                        <ul role="list" className="space-y-4">
                          {plan3Features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 flex-shrink-0 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base font-medium text-gray-500">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <a
                              href="#"
                              className="block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-indigo-600 hover:bg-gray-50"
                              aria-describedby="tier-scale"
                            >
                              Start your trial
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UseCase;
