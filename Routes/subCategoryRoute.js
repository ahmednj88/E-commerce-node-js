const express = require("express");

const { createSubCategory } = require("../services/subCategoryServices");

const {
  createSubCategoryValidtor,
} = require("../utils/validtors/subCategoryValidtor");

const router = express.Router();

router.route("/").post(createSubCategoryValidtor(), createSubCategory);

module.exports = router;
