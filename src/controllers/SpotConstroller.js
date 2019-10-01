const Spot = require('../model/Spot')
const User = require('../model/User')

module.exports = {
    async index(req, res){
        const {tech} = req.query

        const spots = await Spot.find({techs : tech})
        
        return res.json(spots)
    },





    async store(req, res){
        const {user_id} = req.headers
        const {company, techs, price} = req.body
        const {filename} = req.file

        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({message: "User not exists"})
        }

        const spot = await Spot.create({
            thumbnail : filename,
            user : user_id,
            company,
            price,
            techs : techs.split(',').map(tech => tech.trim())
        })

        return res.json(spot)

    }
}