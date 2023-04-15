//Create a model for Vitals
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VitalsSchema = new Schema({
    bodyTemperature: {
        type: Number,
        required: true
    },
    heartRate: {
        type: Number,
        required: true
    },
    bloodPressure: {
        type: Number,
        required: true
    },
    respiratoryRate: {
        type: Number,
        required: true
    },
    pulseRate: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Vitals = mongoose.model('vitals', VitalsSchema);
