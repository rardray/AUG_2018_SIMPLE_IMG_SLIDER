const AuthenticationController = require('./controllers/authentication'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport'),
    albums = require('./controllers/photocollection'),
    profile= require('./controllers/profile');

    //middleware
    const requireAuth = passport.authenticate('jwt', {session: false});
    const requireLogin = passport.authenticate('local', {session: false});
    
    //exports router to index.js as function 
    module.exports = function(app) {
        const apiRoutes = express.Router(),
            authRoutes = express.Router(),
            albumRoutes = express.Router(),
            profileRoutes = express.Router();

        apiRoutes.use('/auth', authRoutes);
        //registration route * note * stacks on /auth because apiRoutes is root
        authRoutes.post('/register', AuthenticationController.register); //<--- calls register function from authentication
        //login Route
        authRoutes.post('/login', requireLogin, AuthenticationController.login); //<---- calls login function from authentication and passport
        //Photo Collection Routes
        apiRoutes.use('/albums', albumRoutes );
        albumRoutes.get('/one/:id', requireAuth, albums.getAlbum);
        albumRoutes.get('/:collectionId', requireAuth, albums.getPhotoCollection);
        albumRoutes.post('/', requireAuth, albums.postPhotoCollection );
        albumRoutes.put('/change/:id', requireAuth, albums.putPhotoCollection);
        albumRoutes.delete('/delete/:id', requireAuth, albums.deletePhotoCollection);
        //Profile Routes
        apiRoutes.use('/profile', profileRoutes);
        profileRoutes.put('/:id', requireAuth, profile.putProfile );
        profileRoutes.put('/following/:id', requireAuth, profile.putFollowing);
        profileRoutes.get('/all/:id', requireAuth, profile.getProfiles );
        app.use('/', apiRoutes);
};
    