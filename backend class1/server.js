const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("server stardmlkghdhb");
});
app.get("/", (req, res) => {
  res.send("hello jee kaise ho");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  res.send("Car Submitted Successfully");
});
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfully");
  })
  .catch((error) => {
    console.log("recieved an error");
  });
