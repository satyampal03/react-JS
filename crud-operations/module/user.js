const mongoose = require('mongoose');

// define user Schema

const userScema = new mongoose.Schema({
    FirstName :{
        type : String,
        required : true,
    },
    LastName :{
        type : String,
        required : true,
    },
    Age :{
        type : Number,
        required : true,
    },
});

// Create user Model;

const User = mongoose.model('UserModel', userScema);  // UserModel is a model now and we are exporting from here

module.exports = User;