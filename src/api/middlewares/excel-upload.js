const { memoryStorage } = require("multer");
const multer = require("multer");
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/excel");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === "text/csv" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please choose a valid excel file."), false);
  }
};

module.exports = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
}).single("file");
