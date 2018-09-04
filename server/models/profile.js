const mongoose = require('mongoose'),
    Schema = mongoose.Schema


const Profile = new Schema({
    profileId: {type: Schema.Types.ObjectId, ref: 'User' },
    profileImage: {type: String},
    about: {type: String}
},
{ 
    timestamps: true
})

module.exports = mongoose.model('Profile', Profile)