//Create a model for Alerts
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    responderName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    
});

module.exports = Alert = mongoose.model('alerts', AlertSchema);