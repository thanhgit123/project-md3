const { createOrder, getOrder, updateChangeStatus, getAllDataOrderAdmin } = require("../controllers/order.controller");

const orderRouter = (app) => {
  app.post("/api/v1/orders", createOrder);
  app.get("/api/v1/orders/:order_id",getOrder );
  app.put("/api/v1/update/:updateStatus_id",updateChangeStatus);
  app.get("/api/v1/OrderAdmin", getAllDataOrderAdmin);
};
module.exports = {
  orderRouter,
};
