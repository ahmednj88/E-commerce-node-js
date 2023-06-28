const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRouter = require("./Routes/categoryRoute");
dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());

//db connection
dbConnection();

//Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("default"));
}

// Mount Route
app.use("/api/v1/category/", categoryRouter);
 
// here catch router i don`t mention it up ☝️
app.all('*',(req, res,next) => {
// create error and send it to error handling middleware
const error = new Error(`Can't found this route: ${req.originalUrl}  `)
next(error.message);
})
//Express know this is 'Global Error Handling Middleware' when you make four parameters
app.use((err, req ,res, next)=>{
res.status(500).json({Error:err})
})


//Bootstrap
app.listen(8000, () => {
  console.log("app listening");
});
