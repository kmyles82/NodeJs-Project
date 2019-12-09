const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({
    path: './config/config.env'
});

//Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps')

const app = express();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`.yellow.bold);
});

//Handle unhandled Promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    //Close server and exit process with a failure
    server.close(() => process.exit(1))
})