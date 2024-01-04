const db = require("../configs/mysql.config");
async function createOrderDetailSQL(order) {
  try {
    const [result] = await db.execute(
      "insert into order_detail (order_detail_id, product_id, quantity) values (?,?,?)",
      [order.order_id, order.product_id, order.quantity]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

async function getOrderDetailMYSQL(order_id){
  try {
    const [orderDetail] = await db.execute("select * from order_detail INNER JOIN products on order_detail.product_id = products.product_id  INNER JOIN category on products.category_id = category.category_id where order_detail_id = ?",[order_id]);   
    return orderDetail;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createOrderDetailSQL,
  getOrderDetailMYSQL
};
