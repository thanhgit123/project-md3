const {
  getCategoriesMySQL,
  updateCateSQL,
  deleteCateSQL,
  addCateSQL,
} = require("../service/category.service");

async function getCategories(req, res) {
  try {
    const categories = await getCategoriesMySQL();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
}

async function addCategory(req, res) {
  try {
    const { nameCategoryInput } = req.body;
    const result = await addCateSQL(nameCategoryInput);
    console.log(result);
    if (!result) {
      return res.status(500).json({
        message: "Them category that bai",
      });
    }
    const cates = await getCategoriesMySQL();
    res.status(200).json({
      message: "Them category oke",
      cates,
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteCate(req, res) {
  const { id } = req.params;
  const result = await deleteCateSQL(id);
  const cates = await getCategoriesMySQL();
  res.status(200).json({
    message: "Xoa ok",
    cates,
  });
}

async function updateCate(req, res) {
  const { id } = req.params;
  const { nameCate } = req.body;
  console.log(nameCate, id);
  const result = await updateCateSQL(nameCate, id);
  const cates = await getCategoriesMySQL();
  res.status(200).json({
    message: "Cap nhat ok",
    cates,
  });
}

module.exports = {
  getCategories,
  addCategory,
  deleteCate,
  updateCate,
};
