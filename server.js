const express = require('express');
const app = express();
var mongoose = require('mongoose');

//models
const user = require('./routes/user');
const blog = require('./routes/blog');
const user_model = require('./models/user_model')




app.use(express.urlencoded({ extended: false}));
app.set('view-engine', 'ejs');

app.use('/blog', blog);
app.use('/user', user);

mongoose.connect('mongodb://localhost/project_db') 
// mongoose.connect('mongodb://localhost/#####')  replace with your db name
.then(() => console.log('Connected...'))
.catch(err => console.error('Connection failed...'));












app.listen(3000)