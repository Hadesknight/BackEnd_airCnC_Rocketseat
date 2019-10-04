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

        //aqui para usar o socket, estamos pegando o id do usuario que criou o spot em questão
        const ownerSocket =  req.connectUsers[booking.spot.user]

        //aqui se ele existir, vamos mandar todo o booking para ele, sendo um parametro, e uma resposta, como abaixo
        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking)
    }
}