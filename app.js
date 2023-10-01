const express = require('express')
const bodyParser = require('body-parser')
const foodSalesAnalyzeRouter = require('./routes/foodSalesAnalyzeRoutes')

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/v1',foodSalesAnalyzeRouter)
app.use('/api/v1/food', foodSalesAnalyzeRouter)

module.exports = app

