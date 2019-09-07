var User = require('../models/user');
var School = require('../models/school');
var League = require('../models/league');
var path = require('path');
var Team = require('../models/team');
var bcrypt = require('bcrypt-nodejs');
var ObjectID = require('mongodb').ObjectID;


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
         user.save(function(err) {
            if (err) {
               res.send({success: false, message : err.errmsg || "Error"});
            } else {
               res.send({success: true, message: 'User created successfully!'});
            }
         });
      }
   });

   router.post('/update',function(req,res) {
      console.log(req.body);
      res.send({success: true, message: 'User created successfully!'});
      updates = {};
      for (const [key, value] of Object.entries(req.body)) {
         if (key != "authdata" || key != "_id" ) {
            updates[key] = value;
         }
      }
      console.log(updates);
      var newvalues = { $set: { updates } };
      console.log(ObjectID(req.body._id));
      User.findOne({"_id": req.body._id}).select('username').exec(function(err,user) {
         console.log(user);
      });
      User.updateMany({"username": req.body.username}, newvalues, function(err,result) {
         console.log("HEEEEEEEEEEEEEREREREREREREEEEEEE");
         if (err) {
            console.log(err);
            res.send({success: false, error: err.errmsg || "Error Updating"})
         } else {
            console.log(result);
         }
      });

   });

   router.post('/createleague',function(req,res) {
      var league = new League();
      league.name = req.body.name;
      league.admin = req.body.admin;
      members = []
      if (!req.body.name || !req.body.admin) {
         res.send({success: false, message : "Missing Required Fields"});
      } else {
         league.save(function(err) {
            if (err) {
               console.log("Error");
              res.send({success: false, message : err.errmsg || "Error"});
            } else {
               console.log("Success");
              res.send({success: true, message: 'League created successfully!', leagueid: league._id});
            }
         });
      };
   });




  router.post('/addteam', function(req,res) {
     User.findOne({"username": req.body.username}, "email username", function (err, user) {
         if (err || !user) {
            res.send({success: false, message : "Invalid member"});
         } else {
            var team = new Team();
            team.userid = user._id;
            team.leagueid = req.body.league._id;
            team.school0 = '';
            team.school1 = '';
            team.school2 = '';
            team.school3 = '';
            team.school4 = '';
            team.school5 = '';
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
     Team.find({"userid": req.body._id}, "leagueid", function (err, teams) {
       if (err || !teams) {
          res.send({success: false, message : "Could not get leagues"});
       } else {
          leagueids = []
          for(var team in teams){
              leagueids.push(teams[team]["leagueid"]);
           }
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
     League.findOne({"_id": req.body._id}, "name admin", function (err, league) {
       if (err || !league) {
          res.send({success: false, message : "Could not get league"});
       } else {
           Team.find({"leagueid": req.body._id}, "userid leagueid school0 school1 school2 school3 school4 school5", function (err,teams) {
             if (err || !teams) {
                 res.send({success: false, message : "Could not get teams"});
             } else {
                userids = [];
                for (var team in teams){
                   userids.push(teams[team]["userid"]);
                   teams[team].schools = [];
                   teams[team].schools = [team.school0, team.school1, team.school2, team.school3, team.school4, team.school5];
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
            res.send({succes: false, message : "Could not login"});
         } else {
             if (req.body.password) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                   res.send({success: false, message:'Invalid Password'});
                } else {
                   res.send({success: true, message: 'User Authenticated', user});
                }
             } else {
                res.send({success: false, message:'No password'});
             }
         }
      })

   });

   router.post('/updateschools', function(req,res) {
      var fs = require('fs');
      var colors = require("./data/colors");

      fs.readFile('./app/routes/data/fbs.csv', 'utf8', function(err, contents) {
         console.log(contents);
         // console.log(contents);
         contents_array = contents.split(/[\r\n]+/);
         cfb_schools = [];
         categories = [];
         for (var c in contents_array) {
            var s = contents_array[c].split(',')[0]
            if (s) {
               s = s.trim();
            }
            var m = contents_array[c].split(',')[1];
            if (m) {
               m = m.trim();
            }
            var conference = contents_array[c].split(',')[4];
            if (conference) {
               conference = conference.trim();
            }
            var school = new School();
            if (s && m) {
               team_colors = colors[s+' '+m];
               while (typeof(team_colors) === "string") {
                  console.log(team_colors);
                  team_colors = colors[team_colors];
               }
               console.log(s+' '+m);
               console.log(team_colors);
            }
            school.school = s;
            school.mascot = m;
            school.team_name = s + ' ' + m;
            school.conference = conference;
            school.division = "FBS";
            school.wins = 0;
            school.primary_color = '#'+team_colors[0];
            if (team_colors.length > 2) {
               school.secondary_color = '#'+team_colors[2];
            } else {
               school.secondary_color = '#'+team_colors[1];
            }
            school.save(function(err) {
               if (err) {
                 console.log({success: false, message : "Error for "+s});
               } else {
               }
            });
         }
      });

      fs.readFile('./app/routes/data/fcs.csv', 'utf8', function(err, contents) {
         contents_array = contents.split(/[\r\n]+/);
         cfb_schools = [];
         categories = [];

         for (var c in contents_array) {
            var s = contents_array[c].split(',')[0]
            if (s) {
               s = s.trim();
            }
            var m = contents_array[c].split(',')[1];
            if (m) {
               m = m.trim();
            }
            var conference = contents_array[c].split(',')[4];
            if (conference) {
               conference = conference.trim();
            }
            var school = new School();
            if (s && m) {
               team_colors = colors[s+' '+m];
               while (typeof(team_colors) === "string") {
                  console.log(team_colors);
                  team_colors = colors[team_colors];
               }
               console.log(s+' '+m);
               console.log(team_colors);
            }
            school.school = s;
            school.mascot = m;
            school.team_name = s + ' ' + m;
            school.conference = conference;
            school.division = "FCS";
            school.wins = 0;
            school.primary_color = '#'+team_colors[0];
            if (team_colors.length > 2) {
               school.secondary_color = '#'+team_colors[2];
            } else {
               school.secondary_color = '#'+team_colors[1];
            }
            school.save(function(err) {
               if (err) {
                 console.log({success: false, message : "Error for "+s});
               }
            });
         }
      });
   });

   router.get('/schools', function(req,res) {
      School.find({"division": "FBS"}).select('school mascot team_name primary_color secondary_color wins').sort({"school": 1}).exec(function (err, schools) {
         if (err || !schools) {
            console.log(err)
            res.send({success: false, "message" : err.errmsg || "Error"});
         } else {
            var schoolsJSON = {};
            for (let school of schools) {
               schoolsJSON[school._id] = school;
            }
            res.send({success: true, "schools": schools, "schoolsJSON": schoolsJSON});
         }
      })
   });

   // router.post('/updateteams', function(req,res) {
   //    errors = [];
   //    successes = [];
   //    for (team in req.body.teams) {
   //       var newvalues = { $set: {team0: team.team0, team1: team.team1, team2: team.team2, team3: team.team3, team4: team.team4, team5: team.team5,} };
   //       Team.updateOne({'_id': team._id }, newvalues, function (err, result) {
   //          if (err) {
   //             errors.push(team.name);
   //          } else {
   //             success.push(team.name);
   //          }
   //       })
   //    }
   //    res.send({success: errors.length === 0, "failed": errors});
   // });

   router.post('/updateteam', function(req,res) {
      errors = [];
      successes = [];
      team = req.body.team;
      var newvalues = { $set: {school0: team.school0, school1: team.school1, school2: team.school2, school3: team.school3, school4: team.school4, school5: team.school5} };
      Team.updateOne({'_id': team._id }, newvalues, function (err, result) {
         if (err) {
            res.send({success: false, error: err.errmsg || "Error"});
         } else {
            res.send({success: true, update: res.nModified});
         }
      })
   });


   return router;
}
