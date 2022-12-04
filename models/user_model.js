const mongoose = require('mongoose');
const Schema = mongoose.Schema;


User = mongoose.model('User', new Schema( {
	
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


}),);

module.exports = User;