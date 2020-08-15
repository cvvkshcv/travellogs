const mongoose = require('mongoose');

const { Schema } = mongoose;

const reqNum = { type: Number, required: true };
const logsEntry = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    comments: String,
    image: [String],
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    hidden: { type : Boolean, default: false },
    latitude: {...reqNum, min: -90, max: 90},
    longitude: {...reqNum, min:-180, max: 180},
    visitedDate: { required: true, type: Date }
}, {
    timestamps : true
});

module.exports = mongoose.model('LogsEntry', logsEntry);