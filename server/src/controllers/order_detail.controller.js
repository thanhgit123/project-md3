const { createOrderDetailSQL, getOrderDetailMYSQL } = require("../service/order_details.service");

async function createOrderDetail(req, res) {
  try {
    await createOrderDetailSQL(req.body);
    res.status(200).json({
      message: "thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
};

async function getOderDetails(req,res){
  try {
    const {order_id} = req.params
    const orderDetail = await getOrderDetailMYSQL(order_id);
    res.status(200).json(orderDetail);
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  createOrderDetail,
  getOderDetails
};
