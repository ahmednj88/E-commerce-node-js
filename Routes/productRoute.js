const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../services/productServices");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validtors/productValidtor");
const subCategoriesRoute = require("./subCategoryRoute");

const router = express.Router();
router.use("/:categoryId/subcategories", subCategoriesRoute);
router
  .route("/")
  .get(getProducts)
  .post(createProductValidator(), createProduct);
// express-validtor  (validtorMiddleware[], service)
// validtorMiddleware = rules + middleware (if there are problem with rule if not run next())
router
  .route("/:id")
  .get(
    //validtorMiddleware
    getProductValidator(),
    //service
    getProductById
  )
  .put(updateProductValidator(), updateProduct)
  .delete(deleteProductValidator(), deleteProductById);
module.exports = router;
