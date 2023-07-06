const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiErorr = require("../utils/apiErorr");
const BrandModel = require("../models/brandModel");

// 'Fetch Brands' Get /api/v1/Brands access Pubilc (all users)
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.limit || 10;
  const skip = (page - 1) * limit;
  const Brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: Brands.length, data: Brands });
});

// 'Fetch Brand by id ' Get /api/v1/Brand/:id access Pubilc (all users)
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new ApiErorr(`No Brand for this ${id} `, 404));
  }
  res.status(200).json({ data: brand });
});

// 'Create Brand' Post /api/v1/Brand access Private (admin)
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// 'Update Brand' Route: Put /api/v1/Brand access Private (admin)
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  //findOneAndUpdate(filter, update data , do you want return a update Brand or the before update Brand)
  if (!brand) {
    return next(new ApiErorr(`No Brand for this ${id} `, 404));
  }
  res.status(200).json({ data: brand });
});

// 'Delete Brand by id ' Delete /api/v1/Brand/:id access  Private (admin)
exports.deleteBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiErorr(`No Brand for this ${id} `, 404));
  }
  res.status(201).json({ data: "No content" });
});
