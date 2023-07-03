const express = require("express");
const {
  createSubCategory,
  getSubCategorios,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategoryById,
} = require("../services/subCategoryServices");
const {
  subCategoryByIdValidtor,
  createSubCategoryValidtor,
  updatesubCategoryValidtor,
  deletesubCategoryValidtor,
} = require("../utils/validtors/subCategoryValidtor");

const router = express.Router();
router
  .route("/")
  .post(createSubCategoryValidtor(), createSubCategory)
  .get(getSubCategorios);
router
  .route("/:id")
  .get(subCategoryByIdValidtor(), getSubCategoryById)
  .put(updatesubCategoryValidtor(), updateSubCategory)
  .delete(deletesubCategoryValidtor(), deleteSubCategoryById);

module.exports = router;
