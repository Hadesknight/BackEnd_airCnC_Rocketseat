const Booking = require("../model/Booking")
const User = require('../model/User')


module.exports ={
    async store(req, res){
        const {user_id} = req.headers
        const {spot_id} = req.params
        const {date} = req.body

        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({message: "You need Login for Booking"})
        }

        const booking = await Booking.create({
            user : user_id,
            spot : spot_id,
            date,
        })

        await booking.populate('spot').populate('user').execPopulate()
        return res.json(booking)
    }
}