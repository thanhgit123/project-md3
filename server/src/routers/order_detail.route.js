const { createOrderDetail, getOderDetails } = require("../controllers/order_detail.controller");

const orderDetailRouter = (app) => {
  app.post("/api/v1/order_details", createOrderDetail);
  app.get("/api/v1/order_details/:order_id", getOderDetails);
};
module.exports = {
  orderDetailRouter,
};
