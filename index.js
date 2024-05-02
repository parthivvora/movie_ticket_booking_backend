const express = require("express");
const cors = require("cors");
const path = require("path");
const flash = require('express-flash');
const app = express();
const db = require("./utils/dbConfig");

app.set("views", "views")
app.set("view engine", "ejs");
app.use(express.json());
app.use(flash());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
  })
);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/index"));

db.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});
