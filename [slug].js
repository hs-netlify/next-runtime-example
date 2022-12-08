import React from "react";
import NavBar from "../../components/navBar";
import posts from "../../data/posts.json";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const getStaticProps = ({ params }) => {
  const { slug } = params;

  const post = posts.find(
    (post) => post.title.replaceAll(" ", "-").toLowerCase() == slug
  );

  let title = post.title;
  return {
    props: { title, post },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const BlogPage = ({ post, title }) => {
  let mostViewedCookie = Cookies.get("mostViewed");
  let mostViewed = JSON.parse(mostViewedCookie ? mostViewedCookie : null);
  const router = useRouter();
  const { slug } = router.query;
  if (mostViewed) {
    if (mostViewed[slug]) {
      mostViewed[slug] += 1;
    } else {
      mostViewed[slug] = 1;
    }
  } else {
    mostViewed = {};
    mostViewed[slug] = 1;
  }
  Cookies.set("mostViewed", JSON.stringify(mostViewed));

  return (
    <div>
      <NavBar />
      <div className="flex justify-center pt-20">
        <div className="w-full max-w-screen-lg">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ">
            <div className="flex-shrink-0">
              <img
                className=" w-full h-80 object-cover"
                src={post.imageUrl}
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600"></p>

                <p
                  id="title"
                  className="text-xl capitalize font-semibold text-gray-900"
                >
                  {title}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {post.description}
                </p>
                <p className="mt-3 text-base text-gray-800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  commodo vehicula neque non consectetur. Cras ante urna,
                  iaculis quis sodales at, fringilla sed urna. Proin eget erat
                  quis nisi consequat aliquam. Aliquam erat volutpat. Integer
                  accumsan placerat vehicula. Sed ornare nunc euismod leo
                  ornare, vel pretium orci tincidunt. Integer ac quam et erat
                  sollicitudin egestas ac tincidunt diam. Aenean sit amet varius
                  nibh. Integer condimentum ante quis placerat cursus. Maecenas
                  in diam non orci tempus auctor non vitae magna. Suspendisse
                  efficitur luctus ultrices. Pellentesque at nisl lobortis,
                  mollis mauris eget, lobortis est. Cras tempus efficitur felis,
                  ut aliquam ligula scelerisque a. Sed iaculis, lectus vitae
                  suscipit viverra, enim augue mattis libero, a mattis nibh eros
                  et lacus. Morbi iaculis quam et consequat pretium. Fusce
                  vulputate ornare est, non iaculis sem ornare at. Fusce
                  efficitur vulputate orci, non pellentesque ipsum condimentum
                  pulvinar.
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <span className="sr-only">{post.author.name}</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post.author.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900"></p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.datetime}>{post.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime} read</span>
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

export default BlogPage;
