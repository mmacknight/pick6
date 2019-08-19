var express = require('express');
var env = require('custom-env').env();
var app = express();
var port = process.env.PORT || 8080
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var cors = require('cors');
var allowedOrigins = ['http://localhost:4200/register', 'http://localhost:4200']
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(cors({
   origins: allowedOrigins
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0-bbt59.mongodb.net/test?retryWrites=true&w=majority', function(err,db) {
   if (err) {
      console.log('Not connected to database: ' + err);
   } else {
      console.log('Connected to database');
      var cursor = db.collection('users').getIndexes();
      // console.log(cursor);
   }
});


app.listen(port, function(req,res) {
   console.log('Running server on port ' + port);
});
