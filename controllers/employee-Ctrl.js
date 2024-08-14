const Employee = require('../models/employee');
const fs = require('fs');
const path = require('path');

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;

        const emailExists = await Employee.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: 'Mobile number must be 10 digits.' });
        }

        let imagePath = '';
        if (req.file) {
            imagePath = path.join('uploads', req.file.filename);
        }

        let courseArray = [];
        if (typeof course === 'string') {
            courseArray = course.split(',').map(item => item.trim());
        } else if (Array.isArray(course)) {
            courseArray = course.map(item => item.trim());
        }

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course: courseArray,
            image: imagePath,
            createdDate: new Date()
        });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
                res.status(200).json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, designation, gender, course } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            name,
            email,
            mobile,
            designation,
            gender,
            course,
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




