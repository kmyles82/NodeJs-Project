const express = require('express')
const router = express.Router();

//express routes
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Show all bootcamps'
    })
})

router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Show a single bootcamp'
    })
})

router.post('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Create a new bootcamps'
    })
})

router.put('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Update a single bootcamp ${req.params.id}`
    })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Deleted a single bootcamp ${req.params.id}`
    })
})

module.exports = router;