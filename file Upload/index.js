//app create
const express = require("express");
const app = express();

//port find krna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;
//middleware add krna h
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//db connection
const db = require("./config/database");
db.connect();

//cloudese connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);
//activate server
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});
//HOzDBImelFpczCWq  "mongodb+srv://anuragjaiswal50877:YCn5CRHa9T2RRYUC@cluster0.e5jc6sz.mongodb.net/FileUploadDataBase?retryWrites=true&w=majority"
