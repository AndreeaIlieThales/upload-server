const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './upload'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype != "image/png" &&
        file.mimetype != "image/jpg" &&
        file.mimetype != "image/jpeg" &&
        file.mimetype != "video/mp4"
    ) {
      return cb(new Error("INVALID_TYPE"));
    }  else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;