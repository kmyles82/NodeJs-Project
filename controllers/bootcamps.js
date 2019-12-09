//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show all bootcamps'
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
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Create a new bootcamps'
    })
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

