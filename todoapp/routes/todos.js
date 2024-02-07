// const express=require("express");
// // const route=express.Router();
// const router = express.Router();
// //import controler
// const {createTodo}=require("../controllers/createTodo");
// //define api routes
// Router.post("/createTodo",createTodo);
// Import the necessary modules
const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
app.use('/todos', todosRouter);

// ... other middleware and route handlers

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

