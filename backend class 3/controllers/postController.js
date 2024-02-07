//import model
const Post = require("../models/postModel");

//bussiness logic
exports.createPost = async (req, res) => {
  try {
    //fetch data from req body
    // console.log("code chala");
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();
    res.json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while Post creatd",
    });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.json({
      posts,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while feching  post",
    });
  }
};

// //kngd
// //import the model
// const Todo = require("../models/postModel");
// //defined route handler

// exports.createPost = async (req, res) => {
//   try {
//     //extract title and body from request body
//     const { title, body } = req.body;
//     //create a new Todo obj and insert in db
//     const response = await post.create({ title, body });
//     //send a json response with a success flag
//     res.status(200).json({
//       success: true,
//       data: response,
//       message: "Entry Created Successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       data: "internal server error",
//       message: err.message,
//     });
//   }
// };
