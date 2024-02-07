const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json requist body
app.use(express.json());

//import routes for todo apiclear

const product = require("./routes/productRoutes");
//mount the todo aspi routes
app.use("/api/v1", product);

//start server
app.listen(PORT, () => {
  console.log(`server started successfully at ${PORT}`);
});
// connect to the database
const dbConnect = require("./config/database");
dbConnect();

// //default route
app.get("/", (req, res) => {
  res.send(`<h1>this is HOMEPAGE I like this page hi i hate coding </h>`);
});
//DATABASE_URL=mongodb://127.0.0.1:27017/anuDatabase
