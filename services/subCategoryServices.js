const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiErorr = require("../utils/apiErorr");

// this run to dont make validate response that no category in body with create createSubCategoryValidtor
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
// 'Create category' Post /api/v1/subcategory access Private (admin)
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// 'Fetch subcategories' Get /api/v1/subcategory access Pubilc (all users)
exports.getSubCategorios = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.limit || 10;
  const skip = (page - 1) * limit;
  let filterObjectFoundWhat = {};

  if (req.params.categoryId) {
    filterObjectFoundWhat = { category: req.params.categoryId };
  }
  const subcategories = await subCategoryModel
    .find(filterObjectFoundWhat)
    .skip(skip)
    .limit(limit)
    .populate("category");
  res.status(200).json({ result: subcategories.length, data: subcategories });
});

// 'Fetch subcategories by id ' Get /api/v1/subcategory/:id access Pubilc (all users)
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findById(id).populate("category");
  if (!subcategory) {
    return next(new ApiErorr(`No subCategory for this ${id} `, 404));
  }
  res.status(200).json({ data: subcategory });
});

// 'Fetch subcategories by categoryId ' Get /api/v1/subcategory/:categoryId/subcategories access Pubilc (all users)
exports.getSubCategoryByCategoriesId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findById(id).populate("category");
  if (!subcategory) {
    return next(new ApiErorr(`No subCategory for this ${id} `, 404));
  }
  res.status(200).json({ data: subcategory });
});

// 'Update subcategory' Route: Put /api/v1/subcategory access Private (admin)
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category },
    { new: true }
  );
  //findOneAndUpdate(filter, update data , do you want return a update subcategory or the before update subcategory)
  if (!subcategory) {
    return next(new ApiErorr(`No category for this ${id} `, 404));
  }
  res.status(200).json({ data: subcategory });
});

// 'Delete subCategory by id ' Delete /api/v1/subcategory/:id access  Private (admin)
exports.deleteSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await subCategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiErorr(`No category for this ${id} `, 404));
  }
  res.status(204).json({ data: "No content" });
});
