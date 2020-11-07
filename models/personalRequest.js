const mongoose = require("mongoose");

const personalRequestSchema = new mongoose.Schema({
    type: { type: String, default: '' },
    body: { type: String, default: '' },
    fullName: { type: String, default: '' },
    status: { type: String, default: 'processing' }
});


const PersonalRequest = new mongoose.model('personalRequest', personalRequestSchema);

module.exports.PersonalRequest = PersonalRequest;