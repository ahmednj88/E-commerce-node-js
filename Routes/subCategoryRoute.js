const express = require("express");
const {
  createSubCategory,
  getSubCategorios,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategoryById,
  setCategoryIdToBody,
} = require("../services/subCategoryServices");
const {
  subCategoryByIdValidtor,
  createSubCategoryValidtor,
  updatesubCategoryValidtor,
  deletesubCategoryValidtor,
} = require("../utils/validtors/subCategoryValidtor");

// mergeParams : Allow us to access parameters on other routers
// Example we need to access categorid from category router
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidtor(), createSubCategory)
  .get(getSubCategorios);
router
  .route("/:id")
  .get(subCategoryByIdValidtor(), getSubCategoryById)
  .put(updatesubCategoryValidtor(), updateSubCategory)
  .delete(deletesubCategoryValidtor(), deleteSubCategoryById);

module.exports = router;
