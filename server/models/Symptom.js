//Create a model for Symptoms
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predefinedSymptom = [
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

//Schema for Symptom bullet points
const SymptomSchema = new Schema({
    selectedSymptom: {
        type: [{
            type: String,
            enum: predefinedSymptom
          }],
        required: true
    },

});

module.exports = mongoose.model('Symptom', SymptomSchema);
    