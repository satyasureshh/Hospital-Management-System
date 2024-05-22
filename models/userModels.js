const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'required']
    },
    email:{
        type:String,
        required:[true,'required']
    },
    password:{
        type:String,
        required:[true,'password is requried']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default: [],
    },
    seennotification: {
        type:Array,
        default: []
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel