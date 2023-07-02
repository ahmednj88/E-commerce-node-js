const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiErorr = require("../utils/apiErorr");
const CategoryModel = require("../models/categoryModel");

// 'Fetch categories' Get /api/v1/category access Pubilc (all users)
exports.getCategorios = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.limit || 10;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, data: categories });
});

// 'Fetch Category by id ' Get /api/v1/category/:id access Pubilc (all users)
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiErorr(`No category for this ${id} `, 404));
  }
  res.status(200).json({ data: category });
});

// 'Create category' Post /api/v1/category access Private (admin)
exports.createCategory = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// 'Update category' Route: Put /api/v1/category access Private (admin)
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  //findOneAndUpdate(filter, update data , do you want return a update category or the before update category)
  if (!category) {
    return next(new ApiErorr(`No category for this ${id} `, 404));
  }
  res.status(200).json({ data: category });
});

// 'Delete Category by id ' Delete /api/v1/category/:id access  Private (admin)
exports.deleteCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiErorr(`No category for this ${id} `, 404));
  }
  res.status(201).json({ data: "No content" });
});
