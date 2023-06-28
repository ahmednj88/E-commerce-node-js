const mongoose = require('mongoose')
const dbConnection=()=>{
    // connect with database
    mongoose.connect(process.env.DB_URL || "").then((conn) => {
        console.log("db has been connected")

    }).catch((err) => {
        console.log(err)
        process.exit(1)
    })
}

module.exports= dbConnection;