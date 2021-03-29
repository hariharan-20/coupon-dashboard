const multer = require("multer");
const path=require("path")


//multer for csv files
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};



var uploadFile = multer({  fileFilter: csvFilter });



module.exports = uploadFile;