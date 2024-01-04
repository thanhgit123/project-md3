const {
  addProductMySQL,
  getAllProductsMySQL,
  updateProductMySQL,
  // getEditProduct,
  deleteProductMySql,
  getProductsByName,
} = require("../service/products.service");
async function getAllProducts(req, res) {
  try {
    const products = await getAllProductsMySQL();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
}
async function getProductsBySearch(req, res) {
  const { key } = req.query;
  try {
    const result = await getProductsByName(key);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
async function addProduct(req, res) {
  try {
    const result = await addProductMySQL(req.body);
    if (!result) {
      return res.status(500).json({
        message: "Co loi khi them san pham",
      });
    }
    const products = await getAllProductsMySQL();
    res.status(200).json({
      message: "Them san pham thanh cong",
      products,
    });
  } catch (error) {
    console.log(error);
  }
}
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name_product, price, image, stock, description, category_id } =
      req.body;
    const result = await updateProductMySQL(
      name_product,
      price,
      image,
      stock,
      description,
      category_id,
      id
    );
    const products = await getAllProductsMySQL();
    res.status(200).json({
      message: "Sua san pham thanh cong",
      products,
    });
  } catch (error) {
    console.log(error);
  }
}
// async function editProduct(req, res) {
//   const { id } = req.params;
//   const result = await getEditProduct(id);
//   const products = await getAllProductsMySQL();
//   res.status(200).json({
//     message: "Sua san pham thanh cong",
//     products,
//   });
// }
async function deleteProduct(req, res) {
  const { id } = req.params;
  const result = await deleteProductMySql(id);
  const products = await getAllProductsMySQL();
  res.status(200).json({
    message: "Xoa san pham thanh cong",
    products,
  });
}
module.exports = {
  getAllProducts,
  getProductsBySearch,
  addProduct,
  updateProduct,
  deleteProduct,
};
