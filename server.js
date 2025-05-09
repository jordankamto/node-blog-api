const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv").config();

const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//permit the parsing of json data where ever  it be done
app.use(bodyParser.json());

//permit the parsing of single files through filed named 'image' via requests
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//access the server.js directory path then to the images folder found in the same dir to access ./images and serve them statically
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/documents", express.static(path.join(__dirname, "documents")));

//Middleware to permit cross-site requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Default backend API message
app.get("/api", (req, res) => {
  res
    .status(200)
    .json({ message: `API is Currently running of port: ${process.env.PORT}` });
});

app.use("/api/auth", authRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/user", userRoutes);

//advanced error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//404 page handling
app.use((req, res, next) => {
  res.status(404).send("404 : Invalid request check and try again");
  next();
});

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
