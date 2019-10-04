const Booking = require('../model/Booking')

module.exports={
    async store(req, res){
        const {booking_id} = req.params

        const booking = await Booking.findById(booking_id).populate('spot')

        booking.approved = false
        booking.save()

        //aqui para usar o socket, estamos pegando o id do usuario que criou o spot em questão
        const bookingUserSocket =  req.connectUsers[booking.user]

        //aqui se ele existir, vamos mandar todo o booking para ele, sendo um parametro, e uma resposta, como abaixo
        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_request', booking)
        }

        return res.json(booking)
    }
}