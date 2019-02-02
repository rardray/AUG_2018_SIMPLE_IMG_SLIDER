"use strict"

const User = require('../models/user');
const mongoose = require('mongoose');

exports.putProfile = function(req, res, next) {
    const id = req.params.id;
    const profileImage = req.body.profileImage;
    User.findByIdAndUpdate(id, {$set: {'profile.profileImage' : profileImage}}, {new: true}, function(err, data){
        if(err) {
            res.send({error: err});
            return next(err);
        };
        res.status(200).json(data);
        console.log(data);
    })
}
exports.putFollowing = function(req, res, next) {
    const id = req.params.id;
    const fId = req.body.id;
    console.log(fId);
    User.findByIdAndUpdate(id, {$push: {'following' : fId}}, {new: true}, function(err, data) {
        if (err) { res.send({error: err});
            return next(err);
         };
         res.status(200).json(data);
         console.log(data);
    })
}

function getUserSchema(data)  {
    let user = data.map(el => {
        return {
            id: el._id,
            name: el.profile.firstName + ' ' + el.profile.lastName,
            email: el.email,
            profileImage: el.profile.profileImage,
            following: el.following,
            followers: el.followers
        };
    });
    return user
};

function getLimits(data) {
    if (data === 'friend-bar') {
        return 5
    } else {
        return null
    };
};

exports.getProfiles = function(req, res, next) {
    let x = getLimits(req.header('Friends'));
    let id = req.params.id;
    User.findById(id, function(err, files) {
        const following = files.following;
        console.log(following);
        let users = following.map(el => {
            return mongoose.Types.ObjectId(`${el}`);
        });
        console.log(users);
        if (err) {res.send({error: err}); 
            return next(err) };
        User.find({'_id' : { $in: users }}).limit(x).exec(function(err, user) {
            let newUser = getUserSchema(user);
            if (err) { res.send({error: err});
            return next(err) };
            res.status(201).json(newUser);
        });
    });
};