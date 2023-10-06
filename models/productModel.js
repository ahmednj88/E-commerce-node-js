const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: [3, "Too short product title"],
      maxLength: [200, "Too long product title"],
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    descriptin: {
      type: String,
      require: [true, "Product description is required"],
      minLength: [20, "Too short product title"],
    },
    quantity: {
      type: Number,
      require: [true, "Product quantity is required"],
      lowercase: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too short product price"],
    },
    priceAfterDiscount: {
      type: Number,
      require: [true, "Product price is required"],
      trim: true,
      minLength: [3, "Too short product price"],
      maxLength: [20, "Too long product price"],
    },
    colors: [String],
    images: [String],
    imageCover: {
      type: String,
      require: [true, "Productn image cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating Average must above or equal 1"],
      max: [5, "Rating Average must below or equal 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
//mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});
module.exports = mongoose.model("Product", productSchema);
