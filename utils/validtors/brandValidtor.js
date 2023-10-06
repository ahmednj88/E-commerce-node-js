const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validtorMiddlware");

// Validator functions of get category by id
exports.BrandByIdValidtor = () => [
  check("id").isMongoId().withMessage("Invalid Brand id "),
  validatorMiddleware,
];

exports.createBrandValidtor = () => [
  check("name")
    .notEmpty()
    .withMessage("Brand name required")
    .isLength({ min: 3 })
    .withMessage("Brand name too short")
    .isLength({ max: 32 })
    .withMessage("Brand name too long"),
  validatorMiddleware,
];



exports.updateBrandValidtor = () => [
  [
    check("id").isMongoId().withMessage("Invalid Brand id "),
    check("name")
      .notEmpty()
      .withMessage("Brand name required")
      .isLength({ min: 3 })
      .withMessage("Brand name too short")
      .isLength({ max: 32 }),
  ],
  validatorMiddleware,
];

exports.deleteBrandValidtor = () => [
  check("id").isMongoId().withMessage("Invalid Brand id "),
  validatorMiddleware,
];
