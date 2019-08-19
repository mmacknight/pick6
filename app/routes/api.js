var User = require('../models/user');
var League = require('../models/league');
var Team = require('../models/team');
var bcrypt = require('bcrypt-nodejs');



module.exports = function(router) {
   router.post('/register',function(req,res) {
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
      user.first = req.body.first;
      user.last = req.body.last;
      user.email = req.body.email;
      // user.id = '1';
      if (!req.body.username || !req.body.password || !req.body.email) {
         res.send('Ensure username, email, password were provided');
      } else {
         console.log(user);
         user.save(function(err) {
            if (err) {
               console.log(err)
               res.send({success: false, message : err.errmsg || "Error"});
            } else {
               res.send({success: true, message: 'User created successfully!'});
            }
         });
      }
   });

   router.post('/createleague',function(req,res) {
      var league = new League();
      league.name = req.body.name;
      league.admin = req.body.admin;
      league.numteams = req.body.numteams;
      members = []
      if (!req.body.name || !req.body.admin || !req.body.numteams) {
         res.send('Ensure name, admin, number of teams were provided');
      } else {
         league.save(function(err) {
            if (err) {
              res.send({success: false, message : err.errmsg || "Error"});
            } else {
              res.send({success: true, message: 'League created successfully!'});
            }
         });
      };
      console.log(league);
   });




  router.post('/addteam', function(req,res) {
     // console.log(req.body);
     User.findOne({"username": req.body.username}, "email username", function (err, user) {
         if (err || !user) {
            console.log(err);
            res.send({success: false, message : "Invalid member"});
         } else {
            console.log(user);
            var team = new Team();
            team.userid = user._id;
            team.leagueid = req.body.league._id;
            res.send({success: true, message : "Member "+user.username+" added!"});
         }
      });

  });

   router.get('/users', function(req,res) {
      User.find({"username": ["mmacknig"]}, 'email username password first last', function (err, users) {
        if (err) {
           res.send("Error");
        } else {
           res.send(users);
        }
     });

   });

   router.post('/login', function(req,res) {
      username = req.body.username
      password = req.body.password

      User.findOne({"username": username }).select('email username password first last').exec(function (err, user) {
         if (err || !user) {
            console.log(err)
            res.send({"message" : err.errmsg || "Error"});
         } else {
             if (req.body.password) {
                var validPassword = user.comparePassword(req.body.password);
             } else {
                res.send({success: false, message:'No password'});
             }
             if (!validPassword) {
                res.send({success: false, message:'Invalid Password'});
             } else {
                res.send({success: true, message: 'User Authenticated', user});
             }
         }
      })


      // var query = User.find({"username": username, "password": password_hash});
      // query.select('_id username password email first last');
   });

   return router;
}
