import React from "react";

import Pricing from "../../components/pricing";
import NavBar from "../../components/navBar";

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
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: ["/use-case/e-commerce", "/use-case/web-app", "/use-case/marketing"],
    fallback: false,
  };
};

const UseCase = ({ pricing, heroText }) => {
  return (
    <div>
      <NavBar />

      <Pricing
        pricing={pricing ? pricing : null}
        heroText={heroText ? heroText : undefined}
      />
    </div>
  );
};
export default UseCase;
