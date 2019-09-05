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
var School = require('./app/models/school.js');
var allowedOrigins = ['http://localhost:4200/register', 'http://localhost:4200','*']
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
app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',appRoutes);

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0-bbt59.mongodb.net/test?retryWrites=true&w=majority', function(err,db) {
   if (err) {
      console.log('Not connected to database: ' + err);
   } else {
      console.log('Connected to database');
      // var cursor = db.collection('users').getIndexes();
      // console.log(cursor);
   }
});


app.listen(port, function(req,res) {
   console.log('Running server on port ' + port);
});



var minutes = 5, interval = minutes * 60 * 1000;

setInterval(function() {
   try {
      console.log("Updating standings..");
      var request = require('request');
      const url = 'https://www.espn.com/college-football/standings'
      request(url, function (error, response, body) {
         if (error) {
            console.log(`Error accessing ${url}:`,{success: false, error: error, statusCode: response && response.statusCode});
         } else {
            var split_body = function (body, next) {
               try {
                  result = body.split('<script type=\'text/javascript\'>window[\'__espnfitt__\']=')[1].split('\"groups\":')[2].split(';</script>')[0].split('},\"requestedDates\":')[0];
                  next(null,result);
               } catch (e) {
                  next(e)
               };
            }

            var data = '';
            split_body(body, function(err, result) {
               data = result;
            });
            // ,function(error, response) {
            //    if (error) {
            //       console.log("Error Accesing standings");
            //    } else {
            //       data = response;
            //    }
            // });         // var data = body.split('<script type=\'text/javascript\'>window[\'__espnfitt__\']=')[1].split('\"groups\":')[2].split(';</script>')[0].split('},\"requestedDates\":')[0];
            if (data) {
               console.log("Data Accessed");
            }
            var wins = {};

            function convert_team_name(name) {
               switch (name) {
                  case "Miami Hurricanes":
                  name = "Miami (FL) Hurricanes";
                  break;
                  case "Florida International Panthers":
                  name = "FIU Panthers";
                  break;
                  case "Southern Mississippi Golden Eagles":
                  name = "Southern Miss Golden Eagles";
                  break;
                  case "Hawai\'i Rainbow Warriors":
                  name = "Hawaii Rainbow Warriors";
                  break;
                  default: ;
               }
               return name;
            }

            for (let conference of JSON.parse(data)) {
               standings = [];
               if (conference.children) {
                  for (let division of conference.children) {
                     standings = division.standings;
                     for (let team of standings) {
                        var newvalues = { $set: {wins: team.stats[11].split('-')[0]} };
                        team.team.displayName = convert_team_name(team.team.displayName);
                        School.updateOne({"team_name": team.team.displayName}, newvalues, function(err,result) {
                           if (err) {
                              console.log("Error finding: ", team.team.displayName);
                           }
                        });
                     }
                  }
               } else {
                  standings = conference.standings;
                  for (let team of standings) {
                     var newvalues = { $set: {wins: team.stats[11].split('-')[0]} };
                     team.team.displayName = convert_team_name(team.team.displayName);
                     School.updateOne({"team_name": team.team.displayName}, newvalues, function(err,result) {
                        if (err) {
                           console.log("Error finding: ", team.team.displayName);
                        }
                     });
                  }
               }

            }
            console.log("Completed Fetching Standings!");
         }
         });
      } catch (e) {
         console.log("Unable to Load Standings");
      }
}, interval);
