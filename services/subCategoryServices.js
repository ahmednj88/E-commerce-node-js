const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiErorr = require("../utils/apiErorr");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

// this run to dont make validate response that no category in body with create createSubCategoryValidtor
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

// 'Fetch subcategories by categoryId ' Get /api/v1/subcategory/:categoryId/subcategories access Pubilc (all users)
exports.getSubCategoryByCategoriesId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findById(id).populate("category");
  if (!subcategory) {
    return next(new ApiErorr(`No subCategory for this ${id} `, 404));
  }
  res.status(200).json({ data: subcategory });
});

// 'Fetch subcategories' Get /api/v1/subcategory access Pubilc (all users)
exports.getSubCategorios = getAll(subCategoryModel);

// 'Fetch subcategories by id 'Get /api/v1/subcategory/:id access Pubilc (all users)
exports.getSubCategoryById = getOne(subCategoryModel);

// 'Create category' Post /api/v1/subcategory access Private (admin)
exports.createSubCategory = createOne(subCategoryModel);

// 'Update subcategory' Route: Put /api/v1/subcategory access Private (admin)
exports.updateSubCategory = updateOne(subCategoryModel);

// 'Delete subCategory by id ' Delete /api/v1/subcategory/:id access  Private (admin)
exports.deleteSubCategoryById = deleteOne(subCategoryModel);
