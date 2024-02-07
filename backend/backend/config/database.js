// const mongoose = require("mongoose");
// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     })
//     .then((data) => {
//       console.log(
//         `mongodb connected successfully with server:${data.connect.host}`
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// module.exports = connectDatabase;
const { default: mongoose } = require("mongoose");
const express = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB ka connection successfully");
    })
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.error(error.message);
    });
};
module.exports = dbConnect;
