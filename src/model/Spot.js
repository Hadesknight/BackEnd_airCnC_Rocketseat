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
},{
    toJSON:{
        virtuals:true
    }
})


SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.20.110:3333/files/${this.thumbnail}`
})
module.exports = mongoose.model("Spot", SpotSchema)