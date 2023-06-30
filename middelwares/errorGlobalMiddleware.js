const errorDevMode = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack // where erorr happened
  });

const errorProdMode = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });

exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("Global error");
  if (process.env.NODE_ENV === "development") {
    errorDevMode(err, res);
  } else {
    errorProdMode(err, res);
  }
};