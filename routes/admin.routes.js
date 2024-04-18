const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { getContactInformation } = require("../controllers/contact.controller");
const { getSubscribeDetails } = require("../controllers/subscribe.controller");
const {
  getUserLists,
  getAdminLogin,
  postAdminLogin,
} = require("../controllers/admin.controller");
const {
  addBlog,
  getAllBlogs,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blog.controller");
const { addMovie } = require("../controllers/movie.controller");
const {
  addLanguage,
  getAllLanguage,
} = require("../controllers/language.controller");
const {
  getAllMovieType,
  addMovieType,
} = require("../controllers/movieType.controller");
const { adminAuth } = require("../middleware/adminAuth");
const blogImageUpload = require("../middleware/blogImageUpload");
const upload = require("../middleware/movieImagesUpload");
const { isAuthenticated } = require("../middleware/check");
require("../middleware/localStrategy");
const router = express();

router.use(
  session({
    name: "admin",
    secret: process.env.SECRET_KEY_ADMIN,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

router.use(passport.initialize());
router.use(passport.session());

// Admin
router.get("/login", getAdminLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login",
    failureFlash: true,
  }),
  postAdminLogin
);

router.get("/get-user-list", isAuthenticated, getUserLists);

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
  adminAuth,
  upload.fields([
    { name: "movieBanner", maxCount: 1 },
    { name: "movieThumbImg", maxCount: 1 },
  ]),
  addMovie
);

// Add Language
router.post("/add-language", adminAuth, addLanguage);
router.get("/get-language", adminAuth, getAllLanguage);

// Add Movie Type
router.post("/add-movieType", adminAuth, addMovieType);
router.get("/get-movieType", adminAuth, getAllMovieType);

module.exports = router;
