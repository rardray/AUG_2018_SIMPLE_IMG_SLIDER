const mongoose = require('mongoose'),
    Schema = mongoose.Schema


const PhotoCollection = new Schema({
    collectionID: {type: Schema.Types.ObjectId, ref: 'User' },
    collectionTitle: {type: String},
    photos: [{type: String}]
},
{ 
    timestamps: true
})

module.exports = mongoose.model('PhotoCollection', PhotoCollection)