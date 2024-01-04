const { getUsers, updateStatusUser } = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/middlewares");

const userRouter = (app) => {
  app.get("/api/v1/users", getUsers);
  app.patch("/api/v1/users/:id", updateStatusUser);
};
module.exports = {
  userRouter,
};
