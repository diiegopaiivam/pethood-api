const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,  
    email: String,
    phone: String,
    city: String,
    uf: String
}); 


module.exports = mongoose.model('User', UserSchema);