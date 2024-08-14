const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
    name: String,
    email: String,
    mobile: Number,
    designation: String,
    gender: String,
    course: [{ type: String }],
    image: String, 
    // createdDate: { 
    //     type: Date, 
    //     default: Date.now 
    // }
},{timestamps:true});

const Employee = model('Employee', employeeSchema);
module.exports = Employee;
