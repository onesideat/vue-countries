const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    domains: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Country', countrySchema);