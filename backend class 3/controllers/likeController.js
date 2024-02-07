// //import model
// const Post = require("../models/postModel");
// const like = require("../models/likeModel");

// //bussiness logic
// exports.likePost = async (req, res) => {
//   try {
//     //fetch data from req body
//     const { post, user } = req.body;
//     //create a like object
//     const like = new Like({
//       post,
//       user,
//     });
//     //save the like into the database
//     const udpatedPost = await Post.findByIdAndUpdate(
//       post,
//       { $push: { likes: savedLike._id } },
//       { new: true }
//     );
//     res.json({
//       post: udpatedPost,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       error: "Error while fetching post",
//     });
//   }
// };

//new
//import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel"); // Change variable name from 'like' to 'Like'

//bussiness logic
exports.likePost = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user } = req.body;
    //create a like object
    const newLike = new Like({
      // Change variable name from 'like' to 'newLike'
      post,
      user,
    });
    //save the like into the database
    const savedLike = await newLike.save(); // Save the newLike object
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while fetching post",
    });
  }
};
//unlike post
// Change variable name from 'like' to 'Like'

//bussiness logic
exports.unlikePost = async (req, res) => {
  try {
    //fetch data from req body
    const { post, like } = req.body;
    //create a like object
    const deletedLike = await Like.findByIdAndDelete({
      post: post,
      _id: like,
    });

    // Save the newLike object
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while fetching post",
    });
  }
};

// exports.dummyLink = (req, res) => {
//   res.send("this is dummy page");
// };
