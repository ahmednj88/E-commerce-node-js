const {
  getCategorios,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../services/categoryServices");
const express = require("express");
const router = express.Router();

router.route("/").get(getCategorios).post(createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategoryById);
module.exports = router;
