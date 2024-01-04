const db = require("../configs/mysql.config");
async function getCategoriesMySQL() {
  try {
    const [categories] = await db.execute("select * from category");
    return categories;
  } catch (error) {
    console.log(error);
  }
}

async function addCateSQL(name_category) {
  const [cate] = await db.execute(
    "insert into category (name_category) values (?)",
    [name_category]
  );
  return cate.insertId;
}

async function deleteCateSQL(category_id) {
  const [cate] = await db.execute("delete from category where category_id = ?", [
    category_id,
  ]);
  return cate.insertId;
}

async function updateCateSQL(nameCate, cateId) {
  const [cate] = await db.execute(
    "update category set nameCate = ? where cateId = ?",
    [nameCate, cateId]
  );
  return cate.insertId;
}

module.exports = { getCategoriesMySQL, addCateSQL,deleteCateSQL,updateCateSQL };
