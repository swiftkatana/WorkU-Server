const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
    email: String, url: String, fullName: String, taskId: String, read: Boolean
});

module.exports.audioSchema = audioSchema;



module.exports.AudioModel = mongoose.model('AudioModel', audioSchema);