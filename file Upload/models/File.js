const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOc", doc);
    //transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    //send mail
    let info = await transporter.sendMail({
      from: "anurag.it19-23@recabn.ac.in",
      to: doc.email,
      subject: "new file uplaoded on cloudinary",
      html: `<h2>Hello ji kaise ho</h2> <p>file uplaoded successfully view here : <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
    });
    console.log("INFO", info);
  } catch (error) {
    console.error(error);
  }
});
module.exports = mongoose.model("File", fileSchema);
// const File = mongoose.model("File", fileSchema);
// module.exports = File;
//YCn5CRHa9T2RRYUC
