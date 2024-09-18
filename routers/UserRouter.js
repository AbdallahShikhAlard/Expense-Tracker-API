
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../modules/users')
const dotenv = require('dotenv').config()

//get users
router.get('/users' , async  (req , res)=> {
    const users = await User.find()
    res.status(200).send(users)
})

//user signe in
router.post('/signein' , async (req,res) => {
    const {username , password} = req.body;
    const user = new User({username , password});
    try {
        user.save()
        res.status(200).send('user created')
    } catch (err) {
        res.status(400).send({message :err.message})
    }
})

// User Login  
router.post('/login', async (req, res) => {  
    const { username, password } = req.body;  
    const user = await User.findOne({ username });  
    if (user && await user.comparePassword(password)) {  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);  
      res.json({ token });  
    } else {  
      res.sendStatus(401);  
    }
});

module.exports = router