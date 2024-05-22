const mongoose = require('mongoose')

const doctorAppointment = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Doctor Name is required']
    },
    doctorName:{
        type:String,
        required:[true]
    },
    upcomingAppointments:{
        type:Array,
        userName:{
            type:String,
            required:[true,'patient name is required']
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
        userName:{
            type:String,
            required:[true,'patient name is required']
        },
        date:{
            type:Date,
            required:[true]
        },
        timeSlot:{
            type:Array,
            required:[true]
        },
        remarks:{
            type:String,
            reqruied:[false]
        }
    }
})

const doctorAppointmentModel = mongoose.model('doctorAppointment',doctorAppointment)

module.exports = doctorAppointmentModel;