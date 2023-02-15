export default async (req, res) => {
  if (req.query.secret !== "TEST" || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({});

  return res.redirect(`/${req.query.slug}?test=test`);
};
