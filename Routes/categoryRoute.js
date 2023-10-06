const express = require("express");
const {
  getCategorios,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../services/categoryServices");

const {
  categoryByIdValidtor,
  createCategoryValidtor,
  updateCategoryValidtor,
  deleteCategoryValidtor,
} = require("../utils/validtors/categoryValidtor");
const subCategoriesRoute = require("./subCategoryRoute");
const { applySlugify } = require("../utils/validtors/globalValidtor");

const router = express.Router();
router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getCategorios)
  .post(createCategoryValidtor(),applySlugify, createCategory);
// express-validtor  (validtorMiddleware[], service)
// validtorMiddleware = rules + middleware (if there are problem with rule if not run next())
router
  .route("/:id")
  .get(
    //validtorMiddleware
    categoryByIdValidtor(),
    //service
    getCategoryById
  )
  .put(updateCategoryValidtor(),applySlugify , updateCategory)
  .delete(deleteCategoryValidtor(), deleteCategoryById);
module.exports = router;
