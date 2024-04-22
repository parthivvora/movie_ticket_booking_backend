const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { getContactInformation } = require("../controllers/contact.controller");
const { getSubscribeDetails } = require("../controllers/subscribe.controller");
const {
  getUserLists,
  getAdminLogin,
  postAdminLogin,
  getDashboard,
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
const {
  addTheater,
  getAllTheaters,
} = require("../controllers/theater.controller");
const {
  addMovieShowType,
  getAllMovieShowType,
} = require("../controllers/movieShowType.controller");
const {
  addScreen,
  getAllScreens,
} = require("../controllers/screen.controller");
const {
  getAllShowTime,
  addShowTimes,
} = require("../controllers/showTime.controller");
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
    successRedirect: "/admin/home",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);

// Get all users list
router.get("/user-list", getUserLists);

// Dashboard
router.get("/dashboard", getDashboard);

// Get all contact information
router.get("/contact-list", getContactInformation);

// Get all subscribes information
router.get("/subscribe-list", getSubscribeDetails);

// Blog
router.post(
  "/add-blog",

  blogImageUpload.single("blogImage"),
  addBlog
);
router.get("/get-blog", getAllBlogs);
router.delete("/delete-blog/:blogId", deleteBlogById);
router.put(
  "/update-blog/:blogId",

  blogImageUpload.single("blogImage"),
  updateBlogById
);

// Add Movie
router.post(
  "/add-movie",

  upload.fields([
    { name: "movieBanner", maxCount: 1 },
    { name: "movieThumbImg", maxCount: 1 },
  ]),
  addMovie
);

// Add Language
router.post("/add-language", addLanguage);
router.get("/get-language", getAllLanguage);

// Add Movie Type
router.post("/add-movieType", addMovieType);
router.get("/get-movieType", getAllMovieType);

// Add Theater
router.post("/add-theater", addTheater);
router.get("/get-theater", getAllTheaters);

// Add Movie Show Type
router.post("/add-movieShowType", addMovieShowType);
router.get("/get-movieShowType", getAllMovieShowType);

// Add Screen
router.post("/add-screen", addScreen);
router.get("/get-screen", getAllScreens);

// Add Show Time of Movie
router.post("/add-showTime", addShowTimes);
router.get("/get-showTime", getAllShowTime);

module.exports = router;
