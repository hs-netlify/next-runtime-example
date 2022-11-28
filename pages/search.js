import React, { useState } from "react";
import NavBar from "../components/navBar";
import posts from "../data/posts.json";
import Link from "next/link";

const Search = () => {
  const [search, setSearch] = useState();
  return (
    <div className="">
      <NavBar />
      <div className="w-full  flex flex-col justify-center h-full items-center px-40 pt-20">
        <label
          htmlFor="search"
          className="block text-3xl font-medium text-gray-700"
        >
          Search
        </label>
        <div className="mt-1 w-full text-xl max-w-[400px]">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
            className=" p-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
            placeholder="Search here..."
          />
        </div>
        {search ? (
          <div className="w-full max-w-screen-lg pt-20">
            <div className="text-2xl mb-10 font-bold">Results</div>
            <>
              {posts.map((post) => (
                <Link
                  href={`${post.href}${search ? "?searchText=" + search : ""}`}
                >
                  <div className="p-6 rounded cursor-pointer hover:bg-gray-200">
                    <div className="text-lg font-bold ">{post.title}</div>
                    <div>{post.description}</div>
                  </div>
                </Link>
              ))}
            </>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Search;
