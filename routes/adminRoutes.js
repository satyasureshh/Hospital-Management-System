const express = require('express');
const{ doctorController, doctorData, updateDoctor, updateDoctorProfile, removeDoctor, getAllUsers,deleteUser,updateUser }= require('../controllers/adminController');


const router = express.Router()

//addDoctor

router.post('/addDoctor',doctorController);
router.get('/getDoctors',doctorData);
router.post('/updateDoctor',updateDoctor);
router.post('/updateDoctorProfile',updateDoctorProfile);
router.post('/removeDoctor',removeDoctor);
router.get("/getAllUsers",getAllUsers);
router.post('/deleteUser',deleteUser);
router.post("/updateUser",updateUser);

module.exports = router; 