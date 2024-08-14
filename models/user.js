const mongoose = require('mongoose')
const {Schema, model} = mongoose
const userSchema = new Schema({
    username: String,
    password: String,
    role: { type: String, default: 'user' }
},{timestamps: true})
const User = model('User', userSchema)
module.exports = User