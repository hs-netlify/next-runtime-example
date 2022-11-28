import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Pricing from "../../../components/pricing";
import NavBar from "../../../components/navBar";
export const getStaticProps = async () => {
  return {
    props: {
      pricing: null,
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
