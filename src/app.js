const express = require("express");
const upload = require("./upload");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Errors = require("./Errors");

const app = express();

//Add the client URL to the CORS policy
const whitelist = ["http://localhost:6006"];
const sleep = (millis) => {
  return new Promise(resolve => setTimeout(resolve, millis));
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const handleUpload = async (req, res) => {
  const u = upload.single("file");
  await sleep(1000);
  u(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({
        error: err.code,
        message: Errors[err.code],
      });
    } else if (err) {
      if (err.message === "FILE_MISSING" ||
          err.message === "INVALID_TYPE") {
        res.statusCode = 400;
        return res.send({ code: err.message, message: Errors[err.message] });
      } else {
        res.statusCode = 500;
        return res.send({ code: "GENERIC_ERROR", message: Errors[err.message] });
      }
    }
    return res.send({ status: "success" })
  })
};

app.post("/upload", handleUpload);


const server = app.listen(4000, function () {
  const port = server.address().port;
  if (!fs.existsSync(path.join(__dirname, './upload'))) {
    fs.mkdir(path.join(__dirname, './upload'), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });

  }
  console.log("App started at http://localhost:%s", port);
});