const {
  getCategories,
  addCategory,
  deleteCate,
  updateCate,
} = require("../controllers/category.controller");
const { verifyToken } = require("../middlewares/middlewares");

const categoryRouter = (app) => {
  app.get("/api/v1/categories", getCategories);
  app.post("/api/v1/categories", verifyToken, addCategory);
  app.delete("/api/v1/deleteCategories/:id", verifyToken, deleteCate);
  app.put("/api/v1/updateCategories/:id", verifyToken, updateCate);
};

module.exports = {
  categoryRouter,
};
