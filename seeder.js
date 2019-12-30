const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dontenv = require('dotenv')

// Load ENV vars
dontenv.config({
    path: './config/config.env'
})

// Load Models
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')
const User = require('./models/User')
const Review = require('./models/Review')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

//Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)
const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
)
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
)

const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
)

// Import data
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log('Bootcamp Data imported...'.green.inverse)
        await Course.create(courses)
        console.log('Course Data imported...'.green.inverse)
        await User.create(users)
        console.log('User Data imported...'.green.inverse)
        await Review.create(reviews)
        console.log('Review Data imported...'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('Bootcamp Data destroyed ...'.red.inverse)
        await Course.deleteMany()
        console.log('Course Data destroyed...'.red.inverse)
        await User.deleteMany()
        console.log('User Data destroyed...'.red.inverse)
        await Review.deleteMany()
        console.log('Review Data destroyed...'.red.inverse)
        if (process.argv[2] === '-d') {
            process.exit()
        }
    } catch (error) {
        console.error(error)
    }
}

// Reset Data
const resetData = async () => {
    try {
        console.log('Deleting data...')
        await deleteData()
        console.log('data deleted')
        console.log('Importing data...')
        await importData()
        console.log('data imported')
    } catch (error) {
        console.error(error)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
} else if (process.argv[2] === '-r') {
    resetData()
}