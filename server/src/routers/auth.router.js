const { register, login } = require("../controllers/auth.controller");
const { checkEmpty, checkEmailExist } = require("../middlewares/middlewares");

const authRouter = (app) => {
  //sign up
  app.post("/api/auth/signup", checkEmpty,checkEmailExist, register);
  //login
  app.post("/api/auth/login", checkEmpty, login);
};

module.exports = { authRouter };
