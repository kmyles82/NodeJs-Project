const geoCoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
});


//@desc     Get a single bootcamps
//@route    GET /api/v1/bootcamps/:id'
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
})

//@desc     Create a single bootcamp
//@route    POST /api/v1/bootcamps'
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        //insert data into database
        const bootcamp = await Bootcamp.create(req.body)

        //201 means something was created
        res.status(201).json({
            success: true,
            data: bootcamp
        })
})

//@desc     Update a single bootcamp
//@route    PUT /api/v1/bootcamps/:id'
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })

    
})

//@desc     Delete a single bootcamp
//@route    DELETE /api/v1/bootcamps/:id'
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: {}
        })

})

//@desc     Get bootcamps within a radius
//@route    Get /api/v1/bootcamps/radius/:zipcode/:distance
//@access   Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params
    
    //Get Lat and Long from geoCoder
    const loc = await geoCoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    //Calculate radius using radians
    //Divide distance by the radius of Earth
    //Radius of Earth  = 3,963 miles
    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius]
            }
        }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

