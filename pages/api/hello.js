// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

  export default (req, res) => {
    res.status(403).json({ error: "Unauthorized access to data" });
  };
