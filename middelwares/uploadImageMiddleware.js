const sharp = require("sharp");
const multer = require("multer");
const expressAsyncHandler = require("express-async-handler");
const ApiErorr = require("../utils/apiErorr");

exports.uploadSingleImage = (filedName) => {
    // 1-diskStorage
// const multerStorge = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/category");
//   },
//   filename: function (req, file, cb) {
//     const filename = `${file.originalname}`;
//     cb(null, filename);
//   },
// });

//  2-memoryStorage
  const multerStorge = multer.memoryStorage();
  exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
    const filename = `${Math.random()}${req.file.originalname}`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/category/${filename}`);
    req.body.image = filename;
    next();
  });
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiErorr("only image files allowed", 400), false);
    }
  };
  const upload = multer({ storage: multerStorge, fileFilter: multerFilter });

  return upload.single(filedName);
};



exports.resizeImageCategory = expressAsyncHandler(async (req, res, next) => {
    const filename = `${Math.random()}${req.file.originalname}`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/category/${filename}`);
    req.body.image =filename;
    next();
  });

  exports.resizeImageBrands = expressAsyncHandler(async (req, res, next) => {
    const filename = `${Math.random()}${req.file.originalname}`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/brands/${filename}`);
    req.body.image = filename;
    next();
  });