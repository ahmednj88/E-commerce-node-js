const express = require("express");
const {
  createSubCategory,
  getSubCategorios,
  getSubCategoriosById,
} = require("../services/subCategoryServices");
const {
  subCategoryByIdValidtor,
  createSubCategoryValidtor, 
} = require("../utils/validtors/subCategoryValidtor");

const router = express.Router();
router
  .route("/")
  .post(createSubCategoryValidtor(), createSubCategory)
  .get(getSubCategorios);
router.route("/:id").get(subCategoryByIdValidtor(), getSubCategoriosById);

module.exports = router;
