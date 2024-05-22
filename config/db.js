const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`DB connected successfully ${mongoose.connection.host}`);
    }
    catch(error)
    {
        console.log(`There was a problem: ${error}`)
    }
};

module.exports = connectDB;