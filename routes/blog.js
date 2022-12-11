const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const auth = require('../middleware/check-auth');
const token = require('../models/user_model');
const router = express.Router()
const app = express();
app.use(express.urlencoded({ extended: false}));
app.set('view-engine', 'html');



router.get('/home', auth, (req, res) => {
    res.sendFile('blog.html', { root: 'views' });
    
});

router.post('/home', auth, (req, res) => {
    res.clearCookie('token').redirect('/user/login');
});




module.exports = router;
