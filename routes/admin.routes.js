const express = require("express");
const { getContactInformation } = require("../controllers/contact.controller");
const { getSubscribeDetails } = require("../controllers/subscribe.controller");
const { adminLogin, getUserLists } = require("../controllers/admin.controller");
const {
  addBlog,
  getAllBlogs,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blog.controller");
const { addMovie } = require("../controllers/movie.controller");
const { adminAuth } = require("../middleware/adminAuth");
const blogImageUpload = require("../middleware/blogImageUpload");
const {
  movieBannerUpload,
  movieThumbsUpload,
} = require("../middleware/movieImagesUpload");
const upload = require("../middleware/movieImagesUpload");
const router = express();

// Admin
router.post("/login", adminLogin);
router.get("/get-user-list", adminAuth, getUserLists);

// Contact
router.get("/get-contact-information", adminAuth, getContactInformation);

// Subscribe
router.get("/get-subscribe", adminAuth, getSubscribeDetails);

// Blog
router.post(
  "/add-blog",
  adminAuth,
  blogImageUpload.single("blogImage"),
  addBlog
);
router.get("/get-blog", adminAuth, getAllBlogs);
router.delete("/delete-blog/:blogId", adminAuth, deleteBlogById);
router.put(
  "/update-blog/:blogId",
  adminAuth,
  blogImageUpload.single("blogImage"),
  updateBlogById
);

// Add Movie
router.post(
  "/add-movie",
  // adminAuth,
  // movieBannerUpload,
  // movieThumbsUpload,
  upload.fields([
    { name: "movieBanner", maxCount: 1 },
    { name: "movieThumbImg", maxCount: 1 },
  ]),
  addMovie
);

module.exports = router;
