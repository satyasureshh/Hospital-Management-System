const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const cors = require('cors')

//database connection
connectDB();

//rest
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));

//port
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server Running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`.bgBlack.white)
});