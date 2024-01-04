const { authRouter } = require("./auth.router");
const { cartRouter } = require("./cart.route");
const { categoryRouter } = require("./categories.route");
const { emailRouter } = require("./email.route");
const { orderDetailRouter } = require("./order_detail.route");
const { orderRouter } = require("./orders.route");
const { productsRouter } = require("./products.route");
const { userRouter } = require("./users.route");

const rootRouter = (app) => {
  authRouter(app);
  categoryRouter(app);
  productsRouter(app);
  emailRouter(app);
  cartRouter(app);
  orderRouter(app);
  orderDetailRouter(app);
  userRouter(app);
};

module.exports = {
  rootRouter,
};
