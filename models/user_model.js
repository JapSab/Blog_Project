const config = require('config');
const { boolean } = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {
	
	name: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    
    lastname: {
        type: String,
        minlength: 2,
        maxlength: 50
    },


	email: {
        type: String,
        minlength: 2,
        maxlength: 255,
        unique: true
    },

    
	password: {
        type: String,
        minlength: 2,
        maxlength: 1024
    },

    isAdmin: Boolean

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        email: this.email,
        userId: this._id,
        isAdmin: this.isAdmin
     }, 
        process.env.JWT_KEY
     ,
     {
        expiresIn:"15m"
     });

    return token
}

User = mongoose.model('User', userSchema);

module.exports = User;