const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiErorr = require("../utils/apiErorr");

// 'Create category' Post /api/v1/category access Private (admin)
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});


// 'Fetch subcategories' Get /api/v1/category access Pubilc (all users)
exports.getSubCategorios = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.limit || 10;
  const skip = (page - 1) * limit;
  const subcategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: subcategories.length, data: subcategories });
});


// 'Fetch subcategories by id ' Get /api/v1/category/:id access Pubilc (all users)
exports.getSubCategoriosById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findById(id);
  if (!subcategory) {
    return next(new ApiErorr(`No subCategory for this ${id} `, 404));
  }
  res.status(200).json({ data: subcategory });
});
