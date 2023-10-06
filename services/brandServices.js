
const BrandModel = require("../models/brandModel");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// 'Fetch Brands' Get /api/v1/Brands access Pubilc (all users)
exports.getBrands = getAll(BrandModel)
// 'Fetch Brand by id ' Get /api/v1/Brand/:id access Pubilc (all users)
exports.getBrandById = getOne(BrandModel)

// 'Create Brand' Post /api/v1/Brand access Private (admin)
exports.createBrand = createOne(BrandModel)

// 'Update Brand' Route: Put /api/v1/Brand access Private (admin)
exports.updateBrand = updateOne(BrandModel);

// 'Delete Brand by id ' Delete /api/v1/Brand/:id access  Private (admin)
exports.deleteBrandById = deleteOne(BrandModel);
