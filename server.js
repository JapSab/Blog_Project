const config = require('config');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
var mongoose = require('mongoose');

//models
const user = require('./routes/user');
const blog = require('./routes/blog');
const user_model = require('./models/user_model');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/blog', blog);
app.use('/user', user);



mongoose.connect('mongodb://localhost/project_db') 
// mongoose.connect('mongodb://localhost/#####')  replace with your db name
.then(() => console.log('Connected...'))
.catch(err => console.error('Connection failed...'));












app.listen(3000)