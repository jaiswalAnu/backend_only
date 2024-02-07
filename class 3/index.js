const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;
//cookie-parser what is this and why we need this?
const cookieParser = (require = "cookie-parser");
app.use(cookieParser());

//middleware
app.use(express.json());

const user = require("./routes/user");
//mount
app.use("/api/v1", user);

require("./config/database").connect();

//start thr sarver
app.listen(PORT, () => {
  console.log(`App is start at Port no  ${PORT}`);
});
// app.get("/", (req, res) => {
//   res.send(`<h1> This is my homePage Boby</h1>`);
//

//?retryWrites=true&w=majority}hAMRAbJVmTsXUxfs);
