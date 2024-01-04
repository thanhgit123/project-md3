const db = require("../configs/mysql.config");
async function getCartByUserId(user_id) {
  try {
    const [cart_user] = await db.execute(
      "select * from cart join products on cart.product_id = products.product_id join category on products.category_id = category.category_id where user_id = ?",
      [user_id]
    );
    return cart_user;
  } catch (error) {
    console.log(error);
  }
}

async function checkProductInCart(cart) {
  try {
    const [check] = await db.execute(
      "select * from cart where user_id = ? and product_id = ?",
      [cart.user_id, cart.product_id]
    );
    return check[0];
  } catch (error) {
    console.log(error);
  }
}
async function addToCartMySQL(cart) {
  try {
    const [result] = await db.execute(
      "insert into cart (user_id,product_id, quantity) values (?,?,1)",
      [cart.user_id, cart.product_id]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function updateQuantity(cart) {
  try {
    const [result] = await db.execute(
      "update cart set quantity = quantity + 1 where user_id = ? and product_id = ?",
      [cart.user_id, cart.product_id]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function deleteCartSQL(id) {
  try {
    const [result] = await db.execute("delete from cart where cart_id = ?", [
      id,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
};
async function deleteCartWhenPaySQL(id){
        try {
    const [result] = await db.execute("delete from cart where user_id = ?", [
      id,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCartByItemSQL(id){
  try {
    const [result] = await db.execute("delete from cart where product_id = ?", [
      id,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

async function decreSQL(id,type) {
  try {
    if (type == "decre") {
      const [result] = await db.execute(
        "update cart set quantity = quantity - 1 where cart_id = ?",
        [id]
      );
      return result.insertId;
    } 
    
  } catch (error) {
    console.log(error);
  }
};
async function increSQL(id,type) {
  try {
    if (type == "incre") {
      const [result] = await db.execute(
        "update cart set quantity = quantity + 1 where cart_id = ?",
        [id]
      );
      return result.insertId;
    } 
    
  } catch (error) {
    console.log(error);
  }
};

async function getCartQuantity(id){
  try {
    const [result] = await db.execute("select *  from cart where cart_id = ? ",[id]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getCartByUserId,
  checkProductInCart,
  addToCartMySQL,
  updateQuantity,
  deleteCartSQL,
  decreSQL ,
  increSQL ,
  getCartQuantity,
  deleteCartByItemSQL,
  deleteCartWhenPaySQL
};
