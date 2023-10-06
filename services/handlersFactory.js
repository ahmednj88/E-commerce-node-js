const asyncHandler = require("express-async-handler");
const ApiErorr = require("../utils/apiErorr");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiErorr(`No document for this ${id} `, 404));
    }
    res.status(201).json({ data: "No content" });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // if (req.body.title) req.body.slug = slugify(req.body.title);
    // if (req.body.name) req.body.slug = slugify(req.body.name);
    const document = await Model.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiErorr(`No Product for this ${id} `, 404));
    }

    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const brand = await Model.create(req.body);
    res.status(201).json({ data: brand });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiErorr(`No Brand for this ${id} `, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, nameOfModle = "") =>
  asyncHandler(async (req, res) => {
    console.log(nameOfModle);
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Model.countDocuments();
    //bulid queries
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(nameOfModle)
      .limitFields()
      .sort();
    //Execute queries
    const { mongooseQuery, paginationResults } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ result: documents.length, paginationResults, data: documents });
  });
