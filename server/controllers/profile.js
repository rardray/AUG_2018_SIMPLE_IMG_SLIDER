"use strict"


const Profile = require('../models/profile')
const User = require('../models/user')
exports.getProfile = function(req, res, next) {
    const profileId = req.params.id
    Profile.findOne({"profileId" : profileId})
    .populate({
        path: 'profileId',
        select: 'profile.firstName profile.lastName'
    }).exec(function(err, profile) {
        if(err) {
            res.send({error: err})
            return next(err)
        }
        res.json(profile)
    })
}

exports.postProfile = function(req, res, next) {
    const profileId = req.params.id
    const profileImage = req.body.profileImage
    const about = req.body.about
    let profile = new Profile({
        profileId: profileId,
        profileImage: profileImage,
        about: about
    })
    profile.save(function(err, profile) {
        if (err) {
            res.send({error: err})
            return next(err)
        }
        res.status(201).json(profile)
    })
}

exports.putProfile = function(req, res, next) {
    const id = req.params.id
    const profileImage = req.body.profileImage
    User.findByIdAndUpdate(id, {$set: {'profile.profileImage' : profileImage}}, {new: true}, function(err, data){
        if(err) {
            res.send({error: err})
            return next(err)
        }
        res.status(200).json(data)
        console.log(data)
    })
}