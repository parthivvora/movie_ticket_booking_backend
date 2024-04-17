const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, `../public/movieImages`);
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    console.log("🚀 ~ file:", file)
    const extension = file.originalname.split(".").pop();
    const filename = `${uuidv4()}.${extension}`;
    cb(null, filename);
  },
});

// const movieThumbsStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("🚀 ~ file:", file);
//     const destinationPath = path.join(__dirname, "../public/movieThumbs");
//     if (!fs.existsSync(destinationPath)) {
//       fs.mkdirSync(destinationPath);
//     }
//     cb(null, destinationPath);
//   },
//   filename: (req, file, cb) => {
//     const extension = file.originalname.split(".").pop();
//     const filename = `${uuidv4()}.${extension}`;
//     cb(null, filename);
//   },
// });

// const movieImagesStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const destinationPath = path.join(__dirname, "../public/movieImages");
//     if (!fs.existsSync(destinationPath)) {
//       fs.mkdirSync(destinationPath);
//     }
//     cb(null, destinationPath);
//   },
//   filename: (req, file, cb) => {
//     const extension = file.originalname.split(".").pop();
//     const filename = `${uuidv4()}.${extension}`;
//     cb(null, filename);
//   },
// });
// const movieBannerUpload = multer({ storage: movieBannersStorage });
// const movieThumbsUpload = multer({ storage: movieThumbsStorage });
// const movieImagesUpload = multer({ storage: movieImagesStorage });

// const movieBannerUpload = multer({ storage: storage("movieBanners") }).single(
//   "movieBanner"
// );
// const movieThumbsUpload = multer({ storage: storage("movieThumbs") }).single(
//   "movieThumbImg"
// );

// module.exports = { movieBannerUpload, movieThumbsUpload };


const upload = multer({ storage: storage });
module.exports = upload;
