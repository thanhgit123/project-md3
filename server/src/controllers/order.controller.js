const { createOrderSQL, getOrderSQL, updateStatus, updateStocksProduct, getAllOrderSQL, getAllOrderAdminMysql } = require("../service/order.service");
const { getOrderDetailMYSQL } = require("../service/order_details.service");

async function createOrder(req, res) {
  try {
    const order = await createOrderSQL(req.body);
    res.status(201).json({ order });
  } catch (error) {
    console.log(error);
  }
}

async function getOrder(req, res) {
  const { order_id } = req.params;
  const order = await getOrderSQL(order_id);
  res.status(200).json(order);
}

async function getAllDataOrderAdmin (req,res){
  const AllOrder = await getAllOrderAdminMysql();
  res.status(200).json(AllOrder);
}

async function updateChangeStatus(req, res) {
  try {
    const { updateStatus_id } = req.params;
    const { status } = req.body;
    const productInOrder = await getOrderDetailMYSQL(updateStatus_id);
    const changeStatus = await updateStatus(updateStatus_id, status);
    await Promise.all(
      productInOrder.map(
        async (product) => await updateStocksProduct(product.product_id, product.quantity)
      )
    );
    const users = await getAllOrderSQL()
    res.status(200).json({message: "Change Oke", users})
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createOrder,
  getOrder,
  updateChangeStatus,
  getAllDataOrderAdmin
};
