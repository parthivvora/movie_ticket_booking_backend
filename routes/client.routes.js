const express = require("express");
const { userRegister, userLogin } = require("../controllers/user.controller");
const { addContactInformation } = require("../controllers/contact.controller");
const { addSubscribeDetails } = require("../controllers/subscribe.controller");
const { userAuth } = require("../middleware/userAuth");
const { getAllBlogsByUser, getSingleBlogByUser } = require("../controllers/blog.controller");
const router = express();

// User
router.post("/register", userRegister);
router.post("/login", userLogin);

// Contact
router.post("/add-contact-information", userAuth, addContactInformation);

// Subscribe
router.post("/add-subscribe", userAuth, addSubscribeDetails);

// Blog
router.get("/get-blog-user", getAllBlogsByUser);
router.get("/get-blog/:blogId", getSingleBlogByUser);

module.exports = router;
