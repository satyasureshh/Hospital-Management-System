const mongoose = require('mongoose')

const doctorScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'username is required']
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone no is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String,
    },
    specialization:{
        type:String,
        required:[true,'required']
    },
    experience:{
        type:String,
        required:[true,'exp requried']
    },
    timings: { 
        type:Array,
        required:[true,'work timing is required']
    },
},
    {timestamps: false}

);

const doctorModel= mongoose.model('doctor', doctorScheme)

module.exports = doctorModel

