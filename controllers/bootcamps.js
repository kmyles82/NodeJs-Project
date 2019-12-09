const Bootcamp = require('../models/Bootcamp')

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
    res.status(200).json({
        success: true,
        msg: 'Show all bootcamps',
        hello: req.hello
    })
}


//@desc     Get a single bootcamps
//@route    GET /api/v1/bootcamps/:id'
//@access   Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show a single bootcamp'
    })
}

//@desc     Create a single bootcamp
//@route    POST /api/v1/bootcamps'
//@access   Private
exports.createBootcamp = async (req, res, next) => {
    try {
        //insert data into database
        const bootcamp = await Bootcamp.create(req.body)

        //201 means something was created
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({ success: false})
    }
}

//@desc     Update a single bootcamp
//@route    PUT /api/v1/bootcamps/:id'
//@access   Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Update a single bootcamp ${req.params.id}`
    })
}

//@desc     Delete a single bootcamp
//@route    DELETE /api/v1/bootcamps/:id'
//@access   Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Deleted a single bootcamp ${req.params.id}`
    })
}

