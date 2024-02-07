const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileupload->handler function
exports.localFileUpload = async (req, res) => {
  try {
    //fech file from requiest
    const file = req.files.file;
    console.log("FiLE a gai ->", file);

    //create path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH->", path);

    //add path to move function
    file.mv(path, (err) => {
      console.log(err);
    });
    //create a successfull responce
    res.json({
      success: true,
      message: "local file upload Successfully",
    });
  } catch (error) {
    console.log("Not able to uoload the file server");
    console.log(error);
  }
};
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload = async (req, res) => {
  try {
    //data fech
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ("jpg", "jpeg", "png");
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    //file format supported hai
    console.log("uploading to cloudinary folder");
    const response = await uploadFileToCloudinary(file, "Anurag folder");
    console.log(response);
    //db me entery save krna hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//video upload code

// exports.videoUpload = async (req, res) => {
//   try {
//     //data fech
//     const { name, tags, email } = req.body;
//     console.log(name, tags, email);
//     const file = req.files.videoFile;
//     //validation
//     const supportedTypes = ("mp4", "mov");
//     const fileType = file.name.split(".")[1].toLowerCase();
//     console.log("File Type", fileType);

//     if (!isFileTypeSupported(fileType, supportedTypes)) {
//       return res.status(400).json({
//         success: false,
//         message: "File format not supported",
//       });
//     }
//     //file format supported hai
//     console.log("uploading to cloudinary folder");
//     const response = await uploadFileToCloudinary(file, "Anurag folder");
//     console.log(response);
//     //db me entery save krna hai
//     const fileData = await File.create({
//       name,
//       tags,
//       email,
//       imageUrl: response.secure_url,
//     });
//     res.json({
//       success: true,
//       imageUrl: response.secure_url,
//       message: "video successfully uploaded",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       success: false,
//       message: "Something wrong ",
//     });
//   }
// };

//chat gpt
exports.videoUpload = async (req, res) => {
  try {
    // Data fetching
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    // Validate file format
    const supportedTypes = ["mp4", "mov"]; // Fixed array syntax
    const file = req.files.videoFile;

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // File format is supported
    console.log("Uploading to Cloudinary folder");
    const response = await uploadFileToCloudinary(file, "Anurag folder");
    console.log(response);

    // Save entry in the database (assuming you have a "File" model)
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//image reducer code
exports.imageSizeReducer = async (req, res) => {
  try {
    //data fech
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ("jpg", "jpeg", "png");
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    //file format supported hai
    console.log("uploading to cloudinary folder");
    const response = await uploadFileToCloudinary(file, "Anurag folder", 30);
    console.log(response);
    //db me entery save krna hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
