require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3011
const path = require('path');
const configureDB = require('./config/db')


const {usersCtrl, getDashboard} = require('./controllers/user-Ctrl')
const {authenticateUser, authorizeUser} = require('./middlewares/auth')
const employeeRoutes = require('./routes/employeeRoutes')
const { getEmployees } = require('./controllers/employee-Ctrl')

configureDB()

app.use(cors())
app.use(express.json())

app.post('/api/user/register', usersCtrl.register)
app.post('/api/user/login',usersCtrl.login)
app.get('/api/user/account',authenticateUser, usersCtrl.account)
app.get('/api/dashboard',authenticateUser,getDashboard)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api',employeeRoutes)

app.listen(port, () => {
    console.log('server running on port', port)
})

