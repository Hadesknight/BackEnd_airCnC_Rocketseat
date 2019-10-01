const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail : String,
    company : String,
    techs : [String],
    price : Number,
    user : {
        type: mongoose.Types.ObjectId,
        ref: 'User'

    }
})

module.exports = mongoose.model("Spot", SpotSchema)