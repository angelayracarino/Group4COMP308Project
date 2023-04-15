//Create a model for Tips
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

});

module.exports = Tips = mongoose.model('tips', TipsSchema);