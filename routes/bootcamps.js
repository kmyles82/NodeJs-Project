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

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

//express routes
router.route('/:id/photos')
    .put(bootcampPhotoUpload)

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/')
    .get(advancedResults(Bootcamp, 'course'), getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)


module.exports = router;