const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

async function sendEmail(req, res) {
  const { email } = req.body;
  console.log(email);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hai880345@gmail.com",
        pass: "xgmyovvnmcyfrvww",
      },
    });

    const viewsDir = path.join(__dirname, "..", "views");
    const htmlPath = path.join(viewsDir, "template.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    const mailOptions = {
      from: "hai880345@gmail.com",
      to: email,
      subject: "HELLO",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: "Vui long kiem tra email cua ban",
    });
  } catch (error) {
    console.error("Error sending forget password email:", error);
    throw new Error("Failed to send the forget password email.");
  }
}

module.exports = {
  sendEmail,
};
