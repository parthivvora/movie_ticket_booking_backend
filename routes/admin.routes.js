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
const {
  addMovie,
  addMoviePageRender,
  getAllMovies,
} = require("../controllers/movie.controller");
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
const {
  checkAdminLogin,
  checkAdminLogincheckAdmin,
  checkAdmin,
} = require("../middleware/check");
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
  addScreenPageRender,
} = require("../controllers/screen.controller");
const {
  getAllShowTime,
  addShowTimes,
} = require("../controllers/showTime.controller");
const actorImageUpload = require("../middleware/actorImageUpload");
const {
  addActor,
  getActor,
  addActorPageRender,
} = require("../controllers/actor.controller");
const crewImageUpload = require("../middleware/crewImageUpload");
const {
  addCrew,
  addCrewPageRender,
  getCrew,
} = require("../controllers/crew.controller");
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
router.get("/login", checkAdmin, getAdminLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);
router.get("/logout", (req, res) => {
  req.logout((err) => {
    res.json(err);
  });
  res.redirect("/admin/login");
});

// Get all users list
router.get("/user-list", checkAdminLogin, getUserLists);

// Dashboard
router.get("/dashboard", checkAdminLogin, getDashboard);

// Get all contact information
router.get("/contact-list", checkAdminLogin, getContactInformation);

// Get all subscribes information
router.get("/subscribe-list", checkAdminLogin, getSubscribeDetails);

// Blog
router.post(
  "/add-blog",
  checkAdminLogin,
  blogImageUpload.single("blogImage"),
  addBlog
);
router.get("/add-blog", checkAdminLogin, addBlogPageRender);
router.get("/get-blog", checkAdminLogin, getAllBlogs);
router.delete("/delete-blog/:blogId", checkAdminLogin, deleteBlogById);
router.put(
  "/update-blog/:blogId",
  checkAdminLogin,
  blogImageUpload.single("blogImage"),
  updateBlogById
);

// Add Movie
router.get("/add-movie", addMoviePageRender);
router.post(
  "/add-movie",
  checkAdminLogin,
  upload.fields([
    { name: "movieBanner", maxCount: 1 },
    { name: "movieThumbImg", maxCount: 1 },
  ]),
  addMovie
);
router.get("/get-movie", getAllMovies);

// Add Language
router.get("/add-language", checkAdminLogin, addLanguagePageRender);
router.post("/add-language", checkAdminLogin, addLanguage);
router.get("/get-language", checkAdminLogin, getAllLanguage);

// Add Movie Type
router.get("/add-movieType", checkAdminLogin, addMovieTypePageRender);
router.post("/add-movieType", checkAdminLogin, addMovieType);
router.get("/get-movieType", checkAdminLogin, getAllMovieType);

// Add Theater
router.get("/add-theater", checkAdminLogin, addTheaterPageRender);
router.post("/add-theater", checkAdminLogin, addTheater);
router.get("/get-theater", checkAdminLogin, getAllTheaters);

// Add Movie Show Type
router.get("/add-movieShowType", checkAdminLogin, addMovieShowTypePageRender);
router.post("/add-movieShowType", checkAdminLogin, addMovieShowType);
router.get("/get-movieShowType", checkAdminLogin, getAllMovieShowType);

// Add Screen
router.get("/add-screen", checkAdminLogin, addScreenPageRender);
router.post("/add-screen", checkAdminLogin, addScreen);
router.get("/get-screen", checkAdminLogin, getAllScreens);

// Add Show Time of Movie
router.post("/add-showTime", addShowTimes);
router.get("/get-showTime", getAllShowTime);

// Actor
router.post(
  "/add-actor",
  checkAdminLogin,
  actorImageUpload.single("actorImage"),
  addActor
);
router.get("/add-actor", checkAdminLogin, addActorPageRender);
router.get("/get-actor", checkAdminLogin, getActor);

// Crew
router.post("/add-crew", crewImageUpload.single("crewImage"), addCrew);
router.get("/add-crew", addCrewPageRender);
router.get("/get-crew", getCrew);

module.exports = router;
