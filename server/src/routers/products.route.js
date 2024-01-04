const {
  addProduct,
  getAllProducts,
  updateProduct,
  // editProduct,
  deleteProduct,
  getProductsBySearch,
} = require("../controllers/products.controller");
const { verifyToken } = require("../middlewares/middlewares");

const productsRouter = (app) => {
  app.get("/api/v1/products", getAllProducts);
  app.get("/api/v1/products/search",verifyToken, getProductsBySearch);
  app.post("/api/v1/products",verifyToken, addProduct);
  app.put("/api/v1/products/:id",verifyToken, updateProduct);
  // app.get("/api/v1/editProduct/:id", editProduct);
  app.delete("/api/v1/deleteProduct/:id",verifyToken, deleteProduct);
};

module.exports = {
  productsRouter,
};
