const express = require("express"),
  app = express(),
  logger = require("morgan"),
  config = require("./config/main"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");
var fileUpload = require("express-fileupload");
const server = app.listen(config.port);
console.log("Server running on " + config.port);
const fs = require("fs-extra");
const path = require("path");
var mkdirp = require("mkdirp");

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);
app.use(fileUpload());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.post("/upload/:id/:pid", (req, res, next) => {
  var imageFile = req.files.file;
  var fileName = req.body.filename;
  var URL = `${__dirname}/public/images/${req.params.id}/${req.params.pid}`;
  var mkdirp = require("mkdirp");
  mkdirp.sync(URL, err => {
    if (err) return;
  });
  imageFile.mv(`${URL}/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send({ error: err });
    }

    res.json(`/${req.params.id}/${req.params.pid}/${req.body.filename}`);
  });
});

app.delete("/delete", (req, res, next) => {
  var body = req.body.id;
  var URL = `${__dirname}/public/images${body}`;
  console.log(URL);
  if (!body.includes(".")) {
    fs.remove(URL, err => {
      if (err) return console.error(err);
      res.sendStatus(204);
      console.log("delete directory");
    });
  } else if (body.includes(".")) {
    fs.unlink(URL, err => {
      if (err) res.send({ error: err });
      return console.error(err);
      res.sendStatus(204);
      console.log("delete file");
    });
  }
});
//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
//app.listen(3001, '192.168.0.3')
router(app); //<--- run router
