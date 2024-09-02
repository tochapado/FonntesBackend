const mongoose = require('mongoose');

const RolaCollectionSchema = new mongoose.Schema({
    rola: {
        type: String,
        required: [true, 'Please add a rola'],
    },
    username: {
        type: String,
        required: [true, 'No user found'],
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('RolaCollection', RolaCollectionSchema);