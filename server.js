const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const dbConnection = require('./config/database')
const categoryRouter = require('./Routes/categoryRoute')

const app = express()
app.use(express.json())


dotenv.config({
    path: ".env"
})

//db connection
dbConnection()


//Middleware
if (process.env.NODE_ENV === 'development') {
    // console.log(`mode : ${process.env.NODE_ENV}`)
    app.use(morgan('default'))
}

// Mount Route
app.use("/api/v1/category/", categoryRouter)


//Bootstrap
app.listen(8000, () => {
    console.log("app listening")
})