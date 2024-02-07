//import the model
const Todo = require("../models/Todo");

//define route handler

exports.getTodo = async (req, res) => {
  try {
    //fetch all todo item from database
    const todos = await Todo.find({});

    //response
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todo Data is fetched",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};
exports.getTodoById = async (req, res) => {
  try {
    //extract todo item basis on id
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });
    //data forgiven id found
    if (!todo) {
      return res.status(404).json({
        success: true,
        message: "No Data Found woth Give Id",
      });
    }
    //data for given id foun d
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data successfully fetched`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};
