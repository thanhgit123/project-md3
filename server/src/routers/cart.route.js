const {
  addToCart,
  getCart,
  deleteCart,
  changeDecreQuantity,
  changeIncreQuantity,
  deleteCartByitem,
  deleteCartWhenPay,
} = require("../controllers/cart.controller");

const cartRouter = (app) => {
  app.get("/api/v1/cart/:user_id", getCart);
  app.post("/api/v1/cart", addToCart);
  app.delete("/api/v1/cart/:product_id",deleteCart);
  app.patch("/api/v1/cart/incre",changeIncreQuantity);
  app.patch("/api/v1/cart/decre",changeDecreQuantity);
  app.delete("/api/v1/deleteByitem/:productIdByItem",deleteCartByitem);
  app.delete("/api/v1/cartDeleteWhenpay/:product_id",deleteCartWhenPay);

  

};

module.exports = { cartRouter };
