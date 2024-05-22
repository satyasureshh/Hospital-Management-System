const mongoose = require('mongoose')

const userAppointment = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'username is required']
    },
    upcommingAppointments:{
        type:Array,
        name: {
            type:String,
            required:[true]
        },
        doctorName:{
            type:String,
            required:[true,'doctor name is required']
        },
        specialization:{
            type:String,
            required:[true,'required']
        },
        phone:{
            type:String,
            required:[true,'Phone no is required']
        },
        email:{
            type:String,
            required:[true,"email is required"]
        },
        date:{
            type:Date,
            required:[true]
        },
        timeSlot:{
            type:Array,
            required:[true]
        }
    },
    completedAppointments:{
        type:Array,
        doctorName:{
            type:String,
            required:[true,'doctor name is required']
        },
        specialization:{
            type:String,
            required:[true,'required']
        },
        phone:{
            type:String,
            required:[true,'Phone no is required']
        },
        email:{
            type:String,
            required:[true,"email is required"]
        },
        remarks:{
            type:String,
        }
    }
})

const userAppointmentModel = mongoose.model('userAppointments',userAppointment)

module.exports = userAppointmentModel;