const db = require("../configs/mysql.config");
async function createOrderSQL(order) {
  try {
    const [result] = await db.execute(
      "insert into orders (user_id, purchase,status, addressBill, phoneBill) values (?,?,?,?,?)",
      [order.user_id, order.purchase,order.status, order.addressBill,order.phoneBill]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
};

async function getOrderSQL(order_id){
  try {
   const [order] = await db.execute("select * from orders where user_id = ? order by order_id desc ",[order_id]);
    return order;
  } catch (error) {
    console.log(error)
  }
};

async function getAllOrderSQL(){
  try {
    const [allOrder]= await db.execute("select * from orders order by order_id desc ");
    return allOrder;
  } catch (error) {
    console.log(error)
  }
}

async function updateStatus(id,status){
  try {
    const [result]= await db.execute("update orders set status = ? where order_id = ?",[status,id] )
    return result.insertId
    } catch (error) {
    console.log(error)
  }
};

async function getAllOrderAdminMysql(){
  try {
    const [allOrder]= await db.execute("select * from orders order by order_id desc ");
    return allOrder;
  } catch (error) {
    console.log(error)
  }
}

async function updateStocksProduct(product_id, quantity) {
  try {
      const [result] = await db.execute(
          "update products set stock = stock - ? where product_id = ?",
          [quantity, product_id]
      );
      return result.insertId;
  } catch (error) {
      console.log(error);
  }
};

module.exports = {
  createOrderSQL,
  getOrderSQL,
  updateStatus,
  updateStocksProduct,
  getAllOrderSQL,
  getAllOrderAdminMysql
};
