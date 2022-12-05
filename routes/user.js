const express = require('express');
const router = express.Router()
const app = express();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const user_model = require('../models/user_model')
const blog = require('./blog');

app.use(express.urlencoded({ extended: false}));
app.set('view-engine', 'html');
app.use('/blog', blog);




router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: 'views' })
});


router.post('/register', async (req, res) => {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.findOne({email: req.body.email});
        if (user) {
            console.log('user already registered')
        } else {
            async function createUser() {
                const user = new User({
                    name: req.body.name + ' ' + req.body.lastname,
                    email: req.body.email,
                    password: hashedPassword

                });
        
                
            const result = await user.save();

            }

            createUser();
            res.redirect('/blog/home')
        }

    }catch {
        
        res.redirect('/register')
    }
});


router.get('/login', async (req, res) => {
    res.render('login.ejs')
});

router.post('/login', async (req, res) => {
    try{
     const user = await User.findOne({email: req.body.email});
     if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.redirect('/blog/home')
        }
     }
        
    } catch {
        console.log('error')
    }
    

   
});



module.exports = router;