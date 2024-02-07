// //import model
// const Post = require("../models/postModel");

// const Comment = require("../models/commentModel");

// //bussiness logic
// exports.createComment = async (req, res) => {
//   try {
//     //fetch data from req body
//     const { post, user, body } = req.body;
//     //crate a comment object
//     const comment = new Comment({
//       post,
//       user,
//       body,
//     });
//     //save the comment into the database
//     const saveComment = await comment.save();

//     //find the post by id add the new comment to its comments array
//     const udpatedPost = await Post.findByIdAndUpdate(
//       post,
//       {
//         $push: { comments: savedComment._id },
//       },
//       { new: true }
//     )
//       .populate("comments") //populate the comments aaray with comment documents
//       .exec();
//     res.json({
//       post: udpatedPost,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: "error while create so comment",
//     });
//   }
// };

//iugub
// Import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Business logic
exports.createComment = async (req, res) => {
  try {
    // Fetch data from req body
    const { post, user, body } = req.body;
    // Create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });
    // Save the comment into the database
    const savedComment = await comment.save(); // Fix the 'Comment' variable

    // Find the post by id and add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: savedComment._id }, // Fix the variable name
      },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.json({
      post: updatedPost,
      comment: savedComment, // Include the saved comment in the response
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while creating a comment",
    });
  }
};
