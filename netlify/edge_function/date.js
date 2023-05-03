export default async (req, context) => {
  const date = Date.now();
  return new Response(`The date that was cached was: ${date}`, {
    headers: {
      "cache-control": "public, s-maxage=3600",
    },
  });
};

export const config = () => ({
  cache: "manual",
  path: "/path1",
});
