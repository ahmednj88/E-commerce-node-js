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
const { uploadBrandImage } = require("../services/brandServices");
const { resizeImageBrands } = require("../middelwares/uploadImageMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(
    uploadBrandImage,
    resizeImageBrands,
    createBrandValidtor(),
    applySlugify,
    createBrand
  );
// express-validtor  (validtorMiddleware[], service)
// validtorMiddleware = rules + middleware (if there are problem with rule if not run next())
router
  .route("/:id")
  .get(BrandByIdValidtor(), getBrandById)
  .put(
    uploadBrandImage,
    resizeImageBrands,
    updateBrandValidtor(),
    applySlugify,
    updateBrand
  )
  .delete(deleteBrandValidtor(), deleteBrandById);
module.exports = router;
