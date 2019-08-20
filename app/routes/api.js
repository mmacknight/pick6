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
              res.send({success: true, message: 'League created successfully!', leagueid: league._id});
            }
         });
      };
   });




  router.post('/addteam', function(req,res) {
     console.log("ADD TEAM");
     console.log(req.body);
     User.findOne({"username": req.body.username}, "email username", function (err, user) {
         if (err || !user) {
            res.send({success: false, message : "Invalid member"});
         } else {
            var team = new Team();
            team.userid = user._id;
            team.leagueid = req.body.league._id;
            // console.log(team);
            // console.log(req.body);
            team.save(function(err) {
               if (err) {
                 res.send({success: false, message : err.errmsg || "Error"});
               } else {
                 res.send({success: true, message : "Member "+user.username+" added!"});
               }
            });
         }
      });

  });

  router.post('/getleagues', function(req,res) {
     console.log(req.body);
     Team.find({"userid": req.body._id}, "leagueid", function (err, teams) {
       if (err || !teams) {
          res.send({success: false, message : "Could not get leagues"});
       } else {
          console.log(teams);
          leagueids = []
          for(var team in teams){
              leagueids.push(teams[team]["leagueid"]);
           }
           console.log(leagueids);
           League.find({"_id": leagueids}, "name admin", function (err,leagues) {
              if (err || !teams) {
                 res.send({success: false, message : "Could not get leagues"});
              } else {
                 res.send({success: true, leagues : leagues});
              }
           })
       }
    })

  });

  router.post('/leaguepage', function(req,res) {
     console.log(req.body);
     League.findOne({"_id": req.body._id}, "name admin", function (err, league) {
       if (err || !league) {
          res.send({success: false, message : "Could not get league"});
       } else {
           Team.find({"leagueid": req.body._id}, "userid leagueid", function (err,teams) {
             if (err || !teams) {
                 res.send({success: false, message : "Could not get teams"});
             } else {
                userids = [];
                for (var team in teams){
                   userids.push(teams[team]["userid"]);
                }
                User.find({"_id": userids}, "username first last email", function (err,users) {
                   if ( err || !users) {
                      res.send({success: false, message : "Could not get users"});
                   } else {
                     users_by_id = {};
                     for (var user in users) {
                        users_by_id[users[user]["_id"]] = users[user];
                     }
                     res.send({success: true, league: league, teams : teams, users: users_by_id});
                   }
                })
              }
           })
       }
    })

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
