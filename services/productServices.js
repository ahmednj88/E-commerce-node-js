const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiErorr = require("../utils/apiErorr");
const ProductModel = require("../models/productModel");

//'Fetch Products' Get /api/v1/product access Pubilc (all users)
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.limit || 10;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
  res.status(200).json({ result: products.length, data: products });
});

// 'Fetch Product by id' Get /api/v1/product/:id access Pubilc (all users)
exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!product) {
    return next(new ApiErorr(`No Product for this ${id} `, 404));
  }
  res.status(200).json({ data: product });
});

//'Create Product' Post /api/v1/product access Private (admin)
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

//'Update Product' Route: Put /api/v1/product access Private (admin)
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  //findOneAndUpdate(filter, update data , do you want return a update Product or the before update Product)
  if (!product) {
    return next(new ApiErorr(`No Product for this ${id} `, 404));
  }
  res.status(200).json({ data: product });
});

//'Delete Product by id' Delete /api/v1/product/:id access  Private (admin)
exports.deleteProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiErorr(`No Product for this ${id} `, 404));
  }
  res.status(204).json({ data: "No content" });
});
