const { memoryStorage } = require("multer");
const multer = require("multer");
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/zip");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === "application/zip" ||
    file.mimetype === "application/octet-stream" ||
    file.mimetype === "application/x-zip-compressed" ||
    file.mimetype === " multipart/x-zip"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please choose a valid zip file."), false);
  }
};

module.exports = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
}).single("file");
