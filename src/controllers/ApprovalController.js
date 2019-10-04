const Booking = require('../model/Booking')

module.exports = {
    async store(req,res){
        //pegando os parametros que vem na rota, o id do booking
        const {booking_id} = req.params
        //pegando no banco de dados os campos que tem o Booking ID, e adicionando as informações do spot relacionado no mesmo
        const booking = await Booking.findById(booking_id).populate('spot')

        //mudando a variavel approved do nosso banco, para aprovado
        booking.approved = true

        //salvando alteração no banco
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