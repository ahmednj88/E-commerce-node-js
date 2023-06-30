const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "subCategory required "],
      unique: [true, "subCategory must be unique"],
      minlength: [3, "Too short subCategory name"],
      maxlength: [32, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must belong to category"],
    },
  },
  { timestamps: true }
);
const subCategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategoryModel;
