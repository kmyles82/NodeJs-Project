const express = require('express')
const dotenv = require('dotenv')

//Load env vars
dotenv.config({
    path: './config/config.env'
});

const app = express();
const PORT = process.env.PORT || 5000

//express routes
app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({success: true, msg: 'Show all bootcamps'})    
})

app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Show a single bootcamp'
    })
})

app.post('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Create a new bootcamps'
    })
})

app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Update a single bootcamp ${req.params.id}`
    })
})

app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Deleted a single bootcamp ${req.params.id}`
    })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});