const express = require('express');
const config = require('config');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const user_model = require('../models/user_model');
const blog = require('./blog');
const Joi = require('joi');
const checkAuth = require('../middleware/check-auth');
const auth = require('../middleware/check-auth');
app.use(express.urlencoded({ extended: false}));
app.set('view-engine', 'html');
app.use('/blog', blog);



router.get('/', async (req, res) => {
   
   res.render('index') 
});


router.get('/register', async (req, res) => {
    res.render('register') 
});


router.post('/register', async (req, res) => {
  
   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(400).send('User already registered');

   user = new User({
        name: req.body.name + ' ' + req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

   await user.save();

   
   const token = user.generateAuthToken();
   res.cookie('token', token, {
      httpOnly: true
   }).redirect('/blog/home');
     
});


router.get('/login', async (req, res) => {
    res.render('login') 
});

router.post('/login', async (req, res) => {
    
   let user = await User.findOne({ email: req.body.email });
   if (!user) return res.status(400).send('Invalid email or password');

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send('Invalid email or password')


   const token = user.generateAuthToken();
   res.cookie('token', token, {
      httpOnly: true
   }).redirect('/blog/home');
    

   
});



module.exports = router;