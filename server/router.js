const AuthenticationController = require('./controllers/authentication'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport')

    //middleware
    const requireAuth = passport.authenticate('jwt', {session: false})
    const requireLogin = passport.authenticate('local', {session: false})
    
    //exports router to index.js as function 
    module.exports = function(app) {
        const apiRoutes = express.Router(),
            authRoutes = express.Router()

        apiRoutes.use('/auth', authRoutes)
        //registration route * note * stacks on /auth because apiRoutes is root
        authRoutes.post('/register', AuthenticationController.register) //<--- calls register function from authentication
        //login Route
        authRoutes.post('/login', requireLogin, AuthenticationController.login) //<---- calls login function from authentication and passport

        
        app.use('/', apiRoutes)

        

    }