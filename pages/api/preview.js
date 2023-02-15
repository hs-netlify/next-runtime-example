export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== "TEST" || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  //   console.log("res", res.setHeader("Location", req.query.slug));
  //   //  res.headers.set("Location", req.query.slug);

  res.setHeader("Location", `https://${req.headers.host}/${req.query.slug}`);
  return res.status(307).json({});
};
