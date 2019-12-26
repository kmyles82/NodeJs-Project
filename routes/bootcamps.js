const express = require('express')
const {
    getBootcamp,
    getBootcamps,
    updateBootcamp,
    deleteBootcamp,
    createBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResults')

//Include other resource routers
const courseRouter = require('./courses')

const { protect } = require('../middleware/auth')

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

//express routes
router.route('/:id/photos')
    .put(protect, bootcampPhotoUpload)

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/')
    .get(advancedResults(Bootcamp, 'course'), getBootcamps)
    .post(protect, createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamp)
    .delete(protect, deleteBootcamp)


module.exports = router;