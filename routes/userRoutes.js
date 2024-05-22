const express = require('express');
const { loginController, registerController, authCtrl,getAppointments,getSpecDoctor, bookAppointment,removeAppointment } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router
const router = express.Router()
//routes
//login
router.post('/register',registerController)
//register
router.post('/login',loginController)

//Auth
router.post('/getUser',authMiddleware, authCtrl)

router.get('/getAppointments',getAppointments)
router.post('/getSpecDoctor',getSpecDoctor)
//appointments
router.post('/bookAppointment',bookAppointment)
router.post('/removeAppointment',removeAppointment)
module.exports = router; 