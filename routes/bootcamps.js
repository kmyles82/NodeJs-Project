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
const reviewRouter = require('./reviews')

const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

//express routes
router.route('/:id/photos')
    .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/')
    .get(advancedResults(Bootcamp, 'course'), getBootcamps)
    .post(protect, authorize('publisher', 'admin') , createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)


module.exports = router;