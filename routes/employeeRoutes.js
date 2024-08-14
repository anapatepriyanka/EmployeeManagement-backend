const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {createEmployee, getEmployees, deleteEmployee, updateEmployee } = require('../controllers/employee-Ctrl');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Only jpg/png files are allowed'));
        } else {
            cb(null, true);
        }
    }
});

router.post('/employees', upload.single('image'), createEmployee);
router.get('/employees', getEmployees);
router.put('/employees/:id', upload.single('image'), updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
