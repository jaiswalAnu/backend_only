const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connectted Successfully");
    })
    .catch((err) => {
      console.log("DB feching Connection Issue");
      console.error(err);
      process.exit(1);
    });
};
// module.exports = connectWithDb;
