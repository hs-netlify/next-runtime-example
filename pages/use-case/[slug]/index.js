import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Pricing from "../../../components/pricing";
import NavBar from "../../../components/navBar";
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
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

const UseCase = ({ pricing }) => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(pricing);

  return (
    <div>
      <NavBar />

      <Pricing pricng={pricing ? pricing : null} />
    </div>
  );
};
export default UseCase;
