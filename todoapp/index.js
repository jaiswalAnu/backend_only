const express=require("express")
const app=express();
//load config from env file
require("dotenv").config();
const Port=process.env.PORT||4000;
//millleware to parse json request body
app.use(express.json());
//import routes for todo api
const todoRoutes=require("./routes/todos");
//mount the todo aspi routes
app.use("/api/v1",todoRoutes);
//start server
app.listen(PORT,()=>{
    console.log(`Server stared succesfully at ${PORT}`);
})
// app.listen(3000,()=>{
//     console.log("ApP ho dir how are you is hhhhh running successfully");
// });
//connect to the database
const dbConnect=require("./config/database");
dbConnect();
//default Route
app.get("/",(req,res)=>{
    res.send(`<h1>this is Homepage body</h1>`);
})
