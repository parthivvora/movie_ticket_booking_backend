const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
    },
    blogDescription: {
      type: String,
    },
    blogImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
