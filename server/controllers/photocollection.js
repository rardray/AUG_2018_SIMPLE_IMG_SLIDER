"use strict"

const PhotoCollection = require('../models/photocollection')
const User = require('../models/user')

exports.getPhotoCollection = (function(req, res, next){
    PhotoCollection.find({collectionId: req.params.collectionId})
    .sort('-createdAt')
    .exec(function(err, photocollection) {
        if(err) {
            res.send({error: err})
            return next(err)
        }
        res.json(photocollection)
    })
})