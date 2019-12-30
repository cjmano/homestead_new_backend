const express = require('express');
const router = express.Router();

//get from userjs in controllers
const { 
    signup, 
    signin, 
    signout, 
    requireSignin } = require('../controllers/auth'); 


const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//secure signin middleware
//router.get('/hello', requireSignin, (req, res) =>{
  //  res.send("hello there");
//});

module.exports = router;