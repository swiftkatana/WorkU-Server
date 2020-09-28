const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');




validateUser = (user) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(10).max(50).required(),
        phone: Joi.string().min(7).max(20).required(),
        userName: Joi.string().min(8).max(50).required(),
        password: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(user, schema);
};


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 55 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 55 },
    date: { type: Date, default: Date.now },
    email: { type: String, unique: true, required: true, minlength: 10, maxlength: 255 },
    userName: { type: String, required: true, minlength: 8, maxlength: 50 },
    password: { type: String, required: true, minlength: 8, maxlength: 1025 },
    phone: { type: String, required: true, minlength: 7, maxlength: 15 },
    goodOrBadUser: Boolean,
    aPaidUser: Boolean,
    isAdmin: Boolean
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const UserModule = mongoose.model('Users', userSchema);


exports.User = UserModule;
exports.validate = validateUser;