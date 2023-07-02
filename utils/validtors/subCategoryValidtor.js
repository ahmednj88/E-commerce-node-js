const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validtorMiddlware");


// Validator functions of get category by id
exports.subCategoryByIdValidtor = () => [
  check("id").isMongoId().withMessage("Invalid category id "),
  validatorMiddleware,
];

exports.createSubCategoryValidtor = () => [
  check("name")
    .notEmpty()
    .withMessage("subCategory name required")
    .isLength({ min: 3 })
    .withMessage("subCategory name too short")
    .isLength({ max: 32 })
    .withMessage("subCategory name too long"),
  check("category")
    .notEmpty()
    .withMessage("category id must not empty")
    .isMongoId()
    .withMessage("invalid category mongo id"),
  validatorMiddleware,
];

// Validator functions of get subCategory by id
// exports.subCategoryByIdValidtor = () => [
//   check("id").isMongoId().withMessage("Invalid subCategory id "),
//   validatorMiddleware,
// ];

// exports.updatesubCategoryValidtor = () => [
//   [
//     check("id").isMongoId().withMessage("Invalid subCategory id "),
//     check("name")
//       .notEmpty()
//       .withMessage("subCategory name required")
//       .isLength({ min: 3 })
//       .withMessage("subCategory name too short")
//       .isLength({ max: 32 })
//       .withMessage("subCategory name too long"),
//   ],
//   validatorMiddleware,
// ];

// exports.deletesubCategoryValidtor = () => [
//   check("id").isMongoId().withMessage("Invalid subCategory id "),
//   validatorMiddleware,
// ];
