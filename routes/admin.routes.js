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
  addBlogPageRender,
} = require("../controllers/blog.controller");
const { addMovie } = require("../controllers/movie.controller");
const {
  addLanguage,
  getAllLanguage,
  addLanguagePageRender,
} = require("../controllers/language.controller");
const {
  getAllMovieType,
  addMovieType,
  addMovieTypePageRender,
} = require("../controllers/movieType.controller");
const { adminAuth } = require("../middleware/adminAuth");
const blogImageUpload = require("../middleware/blogImageUpload");
const upload = require("../middleware/movieImagesUpload");
const { isAuthenticated } = require("../middleware/check");
const {
  addTheater,
  getAllTheaters,
  addTheaterPageRender,
} = require("../controllers/theater.controller");
const {
  addMovieShowType,
  getAllMovieShowType,
  addMovieShowTypePageRender,
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
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);
router.get("/logout", (req, res) => {
  res.clearCookie("admin");
  return res.render("login");
});

// Get all users list
router.get("/user-list", isAuthenticated, getUserLists);

// Dashboard
router.get("/dashboard", isAuthenticated, getDashboard);

// Get all contact information
router.get("/contact-list", isAuthenticated, getContactInformation);

// Get all subscribes information
router.get("/subscribe-list", isAuthenticated, getSubscribeDetails);

// Blog
router.post(
  "/add-blog",
  isAuthenticated,
  blogImageUpload.single("blogImage"),
  addBlog
);
router.get("/add-blog", isAuthenticated, addBlogPageRender);
router.get("/get-blog", isAuthenticated, getAllBlogs);
router.delete("/delete-blog/:blogId", isAuthenticated, deleteBlogById);
router.put(
  "/update-blog/:blogId",
  isAuthenticated,
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
router.get("/add-language", isAuthenticated, addLanguagePageRender);
router.post("/add-language", isAuthenticated, addLanguage);
router.get("/get-language", isAuthenticated, getAllLanguage);

// Add Movie Type
router.get("/add-movieType", isAuthenticated, addMovieTypePageRender);
router.post("/add-movieType", isAuthenticated, addMovieType);
router.get("/get-movieType", isAuthenticated, getAllMovieType);

// Add Theater
router.get("/add-theater", isAuthenticated, addTheaterPageRender);
router.post("/add-theater", isAuthenticated, addTheater);
router.get("/get-theater", isAuthenticated, getAllTheaters);

// Add Movie Show Type
router.get("/add-movieShowType", isAuthenticated, addMovieShowTypePageRender);
router.post("/add-movieShowType", isAuthenticated, addMovieShowType);
router.get("/get-movieShowType", isAuthenticated, getAllMovieShowType);

// Add Screen
router.post("/add-screen", addScreen);
router.get("/get-screen", getAllScreens);

// Add Show Time of Movie
router.post("/add-showTime", addShowTimes);
router.get("/get-showTime", getAllShowTime);

module.exports = router;
