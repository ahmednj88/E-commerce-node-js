const CategoryModel = require("../models/categoryModel");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// 'Fetch categories' Get /api/v1/category access Pubilc (all users)
exports.getCategorios = getAll(CategoryModel)

// 'Fetch Category by id ' Get /api/v1/category/:id access Pubilc (all users)
exports.getCategoryById = getOne(CategoryModel)
// 'Create category' Post /api/v1/category access Private (admin)
exports.createCategory = createOne(CategoryModel)
// 'Update category' Route: Put /api/v1/category access Private (admin)
exports.updateCategory = updateOne(CategoryModel);
// 'Delete Category by id ' Delete /api/v1/category/:id access  Private (admin)
exports.deleteCategoryById =deleteOne(CategoryModel)

