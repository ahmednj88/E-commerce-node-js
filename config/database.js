const mongoose = require("mongoose");
const dbConnection = () => {
  // connect with database
  mongoose.connect(process.env.DB_URL || "").then((conn) => {
    console.log("db has been connected");
  });
  // catch error unhandledRejection in server.js file
};

module.exports = dbConnection;
