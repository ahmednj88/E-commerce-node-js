const express = require("express");
const {
  createBrand,
  getBrandById,
  updateBrand,
  getBrands,
  deleteBrandById,
} = require("../services/brandServices");

const {
  BrandByIdValidtor,
  createBrandValidtor,
  deleteBrandValidtor,
  updateBrandValidtor,
} = require("../utils/validtors/brandValidtor");
const { applySlugify } = require("../utils/validtors/globalValidtor");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidtor(),applySlugify, createBrand);
// express-validtor  (validtorMiddleware[], service)
// validtorMiddleware = rules + middleware (if there are problem with rule if not run next())
router
  .route("/:id")
  .get(BrandByIdValidtor(), getBrandById)
  .put(updateBrandValidtor(), applySlugify, updateBrand)
  .delete(deleteBrandValidtor(), deleteBrandById);
module.exports = router;
