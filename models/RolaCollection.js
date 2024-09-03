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
    tag: {
        type: String,
        required: [true, 'Please add a tag']
    },
    date: {
        type: String,
        default: new Date(),
    },
});

module.exports = mongoose.model('RolaCollection', RolaCollectionSchema);