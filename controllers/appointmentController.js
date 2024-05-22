const doctorAppointmentModel = require('../models/doctorAppointmentModel')
const userAppointmentModel = require('../models/userAppointmentModel')
const addAppointment = async(req,res) => {
    try {
        await doctorAppointmentModel.findOneAndUpdate({name:req.body.name},{$push :{ upcomingAppointments :req.body}})
    }
    catch(err)
    {
        console.log(err);
    }
}

const getAppointment = async(req,res) => {
    try{
        console.log(req.body)
        const app = await doctorAppointmentModel.findOne({name:req.body.name})
        if(app)
        {
            if(app.upcomingAppointments != null){
                return res.status(200).send({success: true, message: 'appointment found',data: app.upcomingAppointments})
            }

        }
        else {
            return res.status(500).send({success: false, message: 'appointment not found'})
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const removeAppointment = async(req,res) => {
    try {
        const docapp =  await doctorAppointmentModel.findOne({doctorName:req.body.doctorName})
        const index = docapp.upcomingAppointments.findIndex((element) => {
            return element.date == req.body.date && element.timeSlot == req.body.timeSlot
        })
        docapp.upcomingAppointments.splice(index,1)
        await doctorAppointmentModel.findOneAndUpdate({doctorName:req.body.doctorName},{upcomingAppointments:docapp.upcomingAppointments})
        return res.status(200).send({success:true,message: "deleted"})
    }
    catch(err)
    {
        console.log(err)
    }
}


module.exports = {addAppointment,getAppointment,removeAppointment}