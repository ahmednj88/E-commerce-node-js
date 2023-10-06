const ProductModel = require("../models/productModel");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

//'Fetch Products' Get /api/v1/product access Pubilc (all users)
exports.getProducts = getAll(ProductModel, "Products");

// 'Fetch Product by id' Get /api/v1/product/:id access Pubilc (all users)
exports.getProductById = getOne(ProductModel);
//'Create Product' Post /api/v1/product access Private (admin)
exports.createProduct = createOne(ProductModel);
//'Update Product' Route: Put /api/v1/product access Private (admin)
exports.updateProduct = updateOne(ProductModel);
//'Delete Product by id' Delete /api/v1/product/:id access  Private (admin)
exports.deleteProductById = deleteOne(ProductModel);
