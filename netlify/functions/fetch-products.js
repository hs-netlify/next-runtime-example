const data = require("../../data/products.json");
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
