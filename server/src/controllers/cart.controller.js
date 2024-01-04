const {
  addToCartMySQL,
  checkProductInCart,
  updateQuantity,
  getCartByUserId,
  deleteCartSQL,
  increSQL,
  getCartQuantity,
  decreSQL,
  deleteCartByItemSQL,
  deleteCartWhenPaySQL,
} = require("../service/cart.service");
async function getCart(req, res) {
  const { user_id } = req.params;
  const cart = await getCartByUserId(user_id);
  res.status(200).json(cart);
}
async function addToCart(req, res) {
  try {
    const check = await checkProductInCart(req.body);
    if (!check) {
      await addToCartMySQL(req.body);
      return res.status(200).json({
        message: "Them vao gio hang thanh cong",
      });
    }
    await updateQuantity(req.body);
    return res.status(200).json({
      message: "Sản phẩm + 1 ",
    });
  } catch (error) {
    console.log(error);
  }
}
async function deleteCart(req, res) {
  const { product_id } = req.params;
  try {
    await deleteCartSQL(product_id);
    res.status(201).json({
      message: "Xoa gio hang thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
};
async function deleteCartWhenPay(req, res) {
  const { product_id } = req.params;
  try {
    await deleteCartWhenPaySQL(product_id);
    res.status(201).json({
      message: "Xoa gio hang thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
};

async function changeDecreQuantity(req, res) {
  const { cart_id } = req.body;
  const { type } = req.body;
console.log(cart_id,type);
  try {
    const cart = await getCartQuantity(cart_id);
    console.log("www",cart)
    if(cart.quantity <= 1){
      await deleteCartSQL(cart_id);
      return res.status(201).json({
        message: "Xoa oke",
      });
    }
    const result = await decreSQL(cart_id,type);
    return res.status(201).json({
      message: "giam thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
};

async function changeIncreQuantity(req, res) {
  const { cart_id } = req.body;
  const { type } = req.body;
  try {
    const result = await increSQL(cart_id,type);
    res.status(201).json({
      message: "tăng số lượng thành công",
    });
  } catch (error) {
    console.log(error);
  }
};

async function deleteCartByitem(req,res){
  const { productIdByItem } = req.params;
  try {
    await deleteCartByItemSQL(productIdByItem);
    res.status(201).json({
      message: "Xoa gio hang thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getCart,
  addToCart,
  deleteCart,
  changeDecreQuantity,
  changeIncreQuantity,
  deleteCartByitem,
  deleteCartWhenPay
};
