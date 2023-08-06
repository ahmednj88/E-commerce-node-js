const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiErorr = require("../utils/apiErorr");
const ProductModel = require("../models/productModel");

//'Fetch Products' Get /api/v1/product access Pubilc (all users)
exports.getProducts = asyncHandler(async (req, res) => {
  // 1-filering
  const queryObj = { ...req.query };
  const excludeFields = ["sort", "page", "limit", "fields", "keyword"];
  excludeFields.forEach((field) => delete queryObj[field]);
  // 2-pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.limit || 10;
  const skip = (page - 1) * limit;
  let querystr = JSON.stringify(queryObj);
  querystr = querystr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  //Build Query
  // 3-Filtering applay using [gtn, gt , lte ,lt  ] when g=> great t=> than l=> less e=> equal
  //Example : price[$gte] use that in postman
  let mongooseQuery = ProductModel.find(JSON.parse(querystr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  // 4-sorting it get if there are multiple sorts (name,price)
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    // take (name -price) like this without ','
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  // 5-Fields Limiting
  if (req.query.fields) {
    console.log(req.query);
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  }
  //6-search
  if (req.query.keyword) {
    console.log(req.query.keyword);
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }
  //Execute query
  const products = await mongooseQuery;
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
