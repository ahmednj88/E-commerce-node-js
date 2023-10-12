const path=require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
                                           
const ApiErorr = require("./utils/apiErorr");
const dbConnection = require("./config/database");
const categoryRouter = require("./Routes/categoryRoute");
const { globalError } = require("./middelwares/errorGlobalMiddleware");
const subCategoryRouter = require("./Routes/subCategoryRoute");
const brandRouter = require("./Routes/brandRoute");
const productRouter = require("./Routes/productRoute");

dotenv.config({
  path: ".env",
});

console.log(process.env.NODE_ENV);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))
//db connection
dbConnection();

//Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("default"));
}

// Mount Route
app.use("/api/v1/category/", categoryRouter);
app.use("/api/v1/subcategory/", subCategoryRouter);
app.use("/api/v1/brands/", brandRouter);
app.use("/api/v1/product/", productRouter);

// here catch router i don`t mention it up ☝️
app.all("*", (req, res, next) => {
  next(new ApiErorr(`Can't found this route: ${req.originalUrl}`, 400));
});

//Express know this is 'Global Error Handling Middleware' when you make four parameters
app.use(globalError);

//Bootstrap
const server = app.listen(8000, () => {
  console.log("app listening");
});

//Handle errors outside express
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection Errors", err);
  // close server connection before close application
  // because maybe there are requset on server so it will done and close application
  server.close(() => {
    console.log("shutting down...");
    process.exit(1);
  });
});
