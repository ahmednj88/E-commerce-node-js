const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validtorMiddlware");

// Validator functions of get category by id
exports.categoryByIdValidtor = () => [
  check("id").isMongoId().withMessage("Invalid category id "),
  validatorMiddleware,
];

exports.createCategoryValidtor = () => [
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 3 })
    .withMessage("Category name too short")
    .isLength({ max: 32 })
    .withMessage("Category name too long"),
  validatorMiddleware,
];

exports.updateCategoryValidtor = () => [
  [
    check("id").isMongoId().withMessage("Invalid category id "),
    check("name")
      .notEmpty()
      .withMessage("Category name required")
      .isLength({ min: 3 })
      .withMessage("Category name too short")
      .isLength({ max: 32 })
      .withMessage("Category name too long"),
  ],
  validatorMiddleware,
];

exports.deleteCategoryValidtor = () => [
  check("id").isMongoId().withMessage("Invalid category id "),
  validatorMiddleware,
];
