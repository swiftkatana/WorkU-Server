const mongoose = require("mongoose");
getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}
const personalRequestSchema = new mongoose.Schema({
    type: { type: String, default: '' },
    body: { type: String, default: '' },
    email: { type: String, default: '' },
    fullName: { type: String, default: '' },
    status: { type: String, default: 'בטיפול' },
    date: { type: String, default: getDate() }
});


const PersonalRequest = new mongoose.model('personalRequest', personalRequestSchema);

module.exports.PersonalRequest = PersonalRequest;
