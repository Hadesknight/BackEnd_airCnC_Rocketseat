const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    date : String,
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        approved : Boolean,
    },
    spot :{
        type: mongoose.Types.ObjectId,
        ref: 'Spot'
    }
})

module.exports = mongoose.model("Booking", BookingSchema)

