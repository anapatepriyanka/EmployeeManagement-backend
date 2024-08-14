const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersCtrl = {}

usersCtrl.register = async(req,res) => {
    
    try{
        const body = req.body
        // console.log(req.body)
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password,salt)
        user.password = encryptedPassword
        await user.save()
        res.status(201).json(user)
    
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}
usersCtrl.login = async(req,res) => {
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({arrays: errors.array})
    // }
    try{
        const {body} = req
        const user = await User.findOne({username: body.username})
        if(!user){
            return res.status(404).json({error: 'invalid username/password'})
        }
        // res.json(user)
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if(!checkPassword){
            return res.status(404).json({error: 'invalid username/password'})
        }
        // res.json(user)
        const tokenData = {
            id : user._id,
            role: user.role
        }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET)
        res.json({token: token})
        
    }catch(err){
        console.log(err)

    }
}
    usersCtrl.account = async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select({ password: 0 })
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.json(user)
            console.log(req.user)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    const getDashboard = (req, res) => {
        res.json({ message: 'Welcome Admin Panel' });
      };

module.exports = {usersCtrl,
    getDashboard}