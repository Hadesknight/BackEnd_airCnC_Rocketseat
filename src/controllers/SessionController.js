const mongoose = require('mongoose')
const User = require('../model/User')

module.exports = {
    async store(req,res){
        const {email} = req.body
        let user = await User.findOne({email})

        if(!user){
            user = await User.create({email})
            return res.json({message:user})
        }
        return res.json(user)
    }
}