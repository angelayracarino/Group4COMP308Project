//Create a model for Symptoms
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predefinedSymptoms = [
    'Fever',
    'Cough',
    'Fatigue',
    'Headache',
    'Loss of taste or smell',
    'Sore throat',
    'Shortness of breath',
    'Muscle aches',
    'Nausea or vomiting',
    'Diarrhea',
    'Runny or stuffy nose',
    'Chills'
  ];

//Schema for Symptoms bullet points
const SymptomsSchema = new Schema({
    selectedSymptoms: {
        type: [{
            type: String,
            enum: predefinedSymptoms
          }],
        required: true
    },

});

module.exports = Symptoms = mongoose.model('symptoms', SymptomsSchema);
    