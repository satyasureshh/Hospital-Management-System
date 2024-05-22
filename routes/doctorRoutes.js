const express = require('express');
const {addAppointment,getAppointment, removeAppointment} = require('../controllers/appointmentController.js');


const router = express.Router()


router.post('/addAppointment',addAppointment);
router.post('/getAppointment',getAppointment);
router.post('/removeAppointment',removeAppointment)
module.exports = router;