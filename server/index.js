const express = require('express'),
    app = express(),
    logger = require('morgan'),
    config = require('./config/main'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors')
var fileUpload = require('express-fileupload');
const server = app.listen(config.port)
console.log('Server running on ' + config.port)

mongoose.connect(config.database)
const API_URL = 'http://192.168.0.3:3001'
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use(cors())
app.post('/upload', (req, res, next) => {
    console.log(req);
    var imageFile = req.files.file;
  
    imageFile.mv(`${__dirname}/public/images/${req.body.filename}`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json( `${API_URL}/public/images/${req.body.filename}`);
    });
  
  })

//cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials")
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})
app.listen(3001, '192.168.0.3')
router(app) //<--- run router