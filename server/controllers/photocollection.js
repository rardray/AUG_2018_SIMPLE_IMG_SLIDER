"use strict"

const PhotoCollection = require('../models/photocollection')
const User = require('../models/user')

exports.getPhotoCollection = (function(req, res, next){
    PhotoCollection.find({collectionId: req.params.collectionId})
    .sort('-createdAt')
    .populate({
        path: 'collectionId',
        select: 'profile.firstName profile.lastName'
    })
    .exec(function(err, photocollection) {
        if(err) {
            res.send({error: err})
            return next(err)
        }
        res.json(photocollection)
    })
})

exports.getAlbum = (function(req, res, next) {
    PhotoCollection.findOne({'_id' : req.params.id})
    .populate({
        path: 'collectionId',
        select: 'profile.firstName profile.lastName'
    })
    .exec(function(err, album){
        if (err) {
            res.send({error: err})
            return next(err)
        }
        res.json(album)
    })
})

exports.postPhotoCollection = (function(req, res, next) {
    const collectionId = req.body.collectionId
    const collectionTitle = req.body.title
    const photos = req.body.photos
    let photocollection = new PhotoCollection({
        collectionId: collectionId,
        collectionTitle: collectionTitle,
        photos: photos
    })
    photocollection.save(function(err, photocollection){
        if (err) {
            return next(err)
        }
        res.status(201).json(photocollection._id)
    })
})