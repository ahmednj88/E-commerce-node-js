//this is class responsible about operations errors
class ApiErorr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperationError = true;
  }
}

module.exports = ApiErorr;
