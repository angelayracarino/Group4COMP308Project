//Create model for User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //_id: {
       // type: String,
        //required: true,
        //unique: true
   // },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },

});

module.exports = User = mongoose.model('users', UserSchema);