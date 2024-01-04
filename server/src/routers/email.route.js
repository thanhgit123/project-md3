const { sendEmail } = require("../controllers/email.controller");

const emailRouter = (app) => {
  app.post("/api/v1/email", sendEmail);
};

module.exports = { emailRouter };
