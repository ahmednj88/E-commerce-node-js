const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validtorMiddlware");

exports.createProductValidator = () => [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product price required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),

  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(
          "price after discount must be lower than price after discount"
        );
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("available colors should be arrays of strings"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be arrays of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid Id formate"),
  check("subcategory").optional().isMongoId().withMessage("Invalid Id formate"),
  check("brand").optional().isMongoId().withMessage("Invalid Id formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Ratings must be a above or equal to 1.0")
    .isLength({ max: 5 })
    .withMessage("Ratings must be a below or equal to 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validatorMiddleware,
];
exports.getProductValidator = () => [
  check("id").isMongoId().withMessage("Invalid Id formate"),
  validatorMiddleware,
];

exports.updateProductValidator = () => [
  check("id").isMongoId().withMessage("Invalid Id formate"),
  validatorMiddleware,
];

exports.deleteProductValidator = () => [
  check("id").isMongoId().withMessage("Invalid Id formate"),
  validatorMiddleware,
];
