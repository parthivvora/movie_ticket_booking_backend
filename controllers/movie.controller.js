const path = require("path");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const movieModel = require("../models/movie.model");
const { addMovieValidation } = require("../validations/movie.validation");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

// Add movie by Admin
exports.addMovie = async (req, res) => {
  try {
    // const { error, value } = addMovieValidation.validate(req.body);
    // if (error) {
    //   return res.status(responseStatusCode.FORBIDDEN).json({
    //     status: responseStatusText.ERROR,
    //     message: error.details[0].message,
    //   });
    // }
   
    console.log(req.files);
    
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addMovie= ~ error:", error)
    fs.unlinkSync(path.join(__dirname, `../public/movieBanners/${req.file.filename}`));
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all blog by Admin
exports.getAllBlogs = async (req, res) => {
  try {
    const blogData = await movieModel.find().select("-__v");
    if (blogData.length > 0) {
      var raw = "";
      Object.keys(blogData).forEach((key) => {
        blogData[key][
          "blogImage"
        ] = `${process.env.IMAGE_URL}/blog/${blogData[key]["blogImage"]}`;
      });
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Blog data fetched successfully",
        data: blogData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No blog data found",
    });
  } catch (error) {
    console.log("🚀 ~ exports.getAllBlogs= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Delete blog by Admin using blogId
exports.deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    await movieModel.updateOne(
      { _id: new mongoose.Types.ObjectId(blogId) },
      { $set: { isDeleted: true } }
    );
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.deleteBlogById ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Update blog by Admin using blogId
exports.updateBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (req.file) {
      const blogData = await movieModel.findOne({
        _id: new mongoose.Types.ObjectId(blogId),
      });
      if (blogData) {
        fs.unlinkSync(
          path.join(__dirname, `../public/blog/${blogData.blogImage}`)
        );
        const updateBlog = {
          blogTitle: req.body.blogTitle,
          blogDescription: req.body.blogDescription,
          blogImage: req.file.filename,
        };
        await movieModel.updateOne(
          { _id: new mongoose.Types.ObjectId(blogId) },
          { $set: updateBlog }
        );
        return res.status(responseStatusCode.SUCCESS).json({
          status: responseStatusText.SUCCESS,
          message: "Blog updated successfully",
        });
      }
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: "Blog not found",
      });
    }
    const updateBlog = {
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
    };
    await movieModel.updateOne(
      { _id: new mongoose.Types.ObjectId(blogId) },
      { $set: updateBlog }
    );
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.deleteBlogById ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all blog by User (Frontend only)
exports.getAllBlogsByUser = async (req, res) => {
  try {
    const blogData = await movieModel.find().select("-__v");
    if (blogData.length > 0) {
      var raw = "";
      Object.keys(blogData).forEach((key) => {
        blogData[key][
          "blogImage"
        ] = `${process.env.IMAGE_URL}/blog/${blogData[key]["blogImage"]}`;
      });
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Blog data fetched successfully",
        data: blogData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No blog data found",
    });
  } catch (error) {
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get single blog by User using blogId (Frontend only)
exports.getSingleBlogByUser = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogData = await movieModel
      .find({ _id: new mongoose.Types.ObjectId(blogId) })
      .select("-__v -updatedAt");
    if (blogData.length > 0) {
      Object.keys(blogData).forEach((key) => {
        blogData[key][
          "blogImage"
        ] = `${process.env.IMAGE_URL}/blog/${blogData[key]["blogImage"]}`;
      });
      return res.status(responseStatusCode.SUCCESS).json({
        status: responseStatusText.SUCCESS,
        message: "Blog data fetched successfully",
        data: blogData,
      });
    }
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "No blog data found",
    });
  } catch (error) {
    console.log("🚀 ~ exports.getAllBlogsByUser= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
