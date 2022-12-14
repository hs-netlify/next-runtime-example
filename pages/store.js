import NavBar from "../components/navBar";
import productList from "../data/products.json";
import React, { useEffect, useState } from "react";

export const getStaticProps = () => {
  let products = productList;
  let listTitle = "Reccomended Products";
  return {
    props: { products, listTitle },
  };
};

export const Store = ({ products, temp, listTitle }) => {
  const [dynamicProp, setDynamicProp] = useState([]);
  useEffect(() => {
    let prods = temp
      ? products.filter((product) => product.temp === temp)
      : products;
    setDynamicProp(prods);
  }, [products, temp]);

  return (
    <div className="bg-white">
      <NavBar />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2
          id="list-title"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          {listTitle}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {dynamicProp.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
