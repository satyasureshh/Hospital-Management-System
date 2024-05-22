const jwt = require('jsonwebtoken')
const userModel = require('../models/userModels')
const appointmentModel = require('../models/userAppointmentModel')
const doctorModel = require('../models/doctorModel')
const bcrpyt = require('bcryptjs')
const userAppointmentModel = require('../models/userAppointmentModel')

const registerController = async(req,res) => {
    try{
        const exists = await userModel.findOne({email:req.body.email})
        if(exists)
        {
            return res
                .status(200)
                .send({message:`User Already Exists`, sucess:false})   
        }
        const password = req.body.password
        const salt = await bcrpyt.genSalt()
        const hashedPassword = await bcrpyt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        const newAppointment = new userAppointmentModel(req.body)
        await newAppointment.save()
        res.status(201).send({message:`Registration,`,sucess:true})
    }
    catch(err){
        console.log(err);
        res.status(500).send({sucess:false, message: `Register ${err.message}`})
    }

}
const loginController = async(req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user)
        {
            return res
                .status(200)
                .send({message:`User Does Not Exist`, sucess:false})   
        }
        const match = await bcrpyt.compare(req.body.password,user.password)
        if(!match)
        {
            return res
                .status(200)
                .send({message:`Invalid Email or Password`, sucess:false})   
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({message:`Login Successful`,sucess:true, token})
    } catch(err)
    {
        console.log(err);
        res.status(500).send({sucess:false, message: `Login ${err.message}`})
    
    }
}

const authCtrl = async(req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        if(!user)
        {
            return res.status(200).send({
                message: 'user not found',
                sucess: false
            })
        }else{
            user.password = undefined
            res.status(200).send({success: true, data: user
            })
        }
    }catch(err) {
        console.log(err);
        res.status(500).send({
            message: 'auth error',
            sucess: false,
            err
        })
    }

}

const getAppointments = async(req,res) =>
{
    try{
        const appointments = await userAppointmentModel.findOne({name:req.body.name})
        if(appointments)
        { return res.status(200).send({success:true,message: "fetched appointments",data: appointments})}
        else{
            return res.status(500).send({success:false,message: "Not found"})
        }
       
    }
    catch(err)
    {
        console.log(err);
    }
}

const getSpecDoctor = async(req,res) =>
{
    console.log(req.body)
     try{
       const docs = await doctorModel.find({specialization:req.body.specialization})
        if(!docs){
            res.status(500).send({
                success:false,
                message:"It dont work"
            })
        }
            else{
                res.status(200).send({
                    success:true,
                    data: docs
                })
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
const bookAppointment = async(req,res) =>
{
    try{
        await userAppointmentModel.findOneAndUpdate({userName:req.body.name},{$push : {upcommingAppointments:req.body}})
        return res.status(200).send({success:true,message: "Done"})
    }
    catch(err){
        console.log(err);
        res.status(500).send({sucess:false, message: `Register ${err.message}`})
    }
}

const removeAppointment = async(req,res) =>
{
    try{
        const app = await userAppointmentModel.findOne({userName:req.body.name})
        console.log(app)
        const index = app.upcommingAppointments.findIndex((element) => {
            return element.date == req.body.date && element.timeSlot == req.body.timeSlot
        })
        app.upcommingAppointments.splice(index,1)
        await userAppointmentModel.findOneAndUpdate({userName:req.body.name},{upcommingAppointments:app.upcommingAppointments})
        return res.status(200).send({success:true,message:"removed"})
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {loginController, registerController, authCtrl ,getAppointments,getSpecDoctor,bookAppointment,removeAppointment};