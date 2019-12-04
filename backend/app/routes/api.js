var User = require('../models/user');
var School = require('../models/school');
var League = require('../models/league');
var path = require('path');
var Team = require('../models/team');
var bcrypt = require('bcrypt-nodejs');
var ObjectID = require('mongodb').ObjectID;
var Math = require('math');

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
      updates = {};
      for (const [key, value] of Object.entries(req.body)) {
         if (key != "authdata" && key != "_id" && !(key == "password" && !value)) {
            updates[key] = value;
         }
      }
      var newvalues = { $set: updates };
      User.update({"_id": req.body._id}, newvalues, function(err,result) {
         if (err) {
            console.log(err);
            res.send({success: false, error: err.errmsg || "Error Updating"})
         } else {
            console.log(result);
            User.findOne({"_id": req.body._id}).select('username password first last email').exec(function(err,user) {
               if (err) {
                  res.send({success: false, error: err.errmsg || "Error Updating"});
               } else {
                  res.send({success: true, user: user});
               }
            });
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

   // router.get('/users', function(req,res) {
   //    User.find({"username": ["mmacknig"]}, 'email username password first last', function (err, users) {
   //      if (err) {
   //         res.send("Error");
   //      } else {
   //         res.send(users);
   //      }
   //   });
   //
   // });

   router.post('/team', function(req,res) {
      if (!req.body.user_id || !req.body.league_id) {
         res.send({success: false, error: "Insufficient Credentials"});
      } else {
         user_id = req.body.user_id;
         league_id = req.body.league_id;
         Team.findOne({"userid": user_id, "leagueid": league_id}).select("userid leagueid school0 school1 school2 school3 school4 school5").exec(function (err, team) {
            if (err) {
               res.send({success: false, error: err.errmsg || "Error"});
            } else {
               console.log(team);
               res.send({success: true, team: team});
            }
         });
      }

   });

   router.post('/login', function(req,res) {
      username = req.body.username;
      password = req.body.password;

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

   router.post('/deleteleague',function(req,res) {
      console.log(req.body);
      if (!req.body.league_id) {
         res.send({success: false, error: "Invalid Form"})
      } else {
         Team.deleteMany({"leagueid": req.body.league_id}, function(err, result) {
            console.log(result);
            if (err) {
               res.send({success: false, error: "Unable to Delete"});
            } else {
               League.deleteOne({"_id": req.body.league_id}, function(err, result) {
                  if (err) {
                     res.send({success: false, error: "Unable to Delete"});
                  } else {
                     res.send({success: true});
                  }
               });
            }
         });
      }
   });

   router.post('/deleteteam',function(req,res) {
      if (!req.body.team_id) {
         res.send({success: false, error: "Invalid Form"})
      } else {
         Team.deleteMany({"_id": req.body.team_id}, function(err, result) {
            console.log(result);
            if (err) {
               res.send({success: false, error: "Unable to Delete"});
            } else {
               res.send({success: true});
            }
         });
      }
   });

   router.get('/games',function(req,res) {
      // const oneWeek = 7 * 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      // const firstTuesday = new Date(2019, 7, 20);
      // var today = new Date(Date.now());
      // const today_ymd = new Date(today.getFullYear(),today.getMonth(),today.getDate(),)
      // const week = Math.floor((today - firstTuesday) / oneWeek);
      try {
         var request = require('request');
         const url = 'https://www.espn.com/college-football/scoreboard';
         request(url, function (error, response, body) {
            if (error) {
               console.log(`Error accessing ${url}:`,{success: false, error: error, statusCode: response && response.statusCode});
            } else {
               var split_body = function (body, next) {
                  try {
                     result = body.split('</script><script>window.espn.scoreboardData 	= ')[1].split(';window.espn.scoreboardSettings')[0];
                     next(null,result);
                  } catch (e) {
                     next(e)
                  };
               }

               var data = '';
               split_body(body, function(err, result) {
                  data = result;
               });

               function convert_team_name(name) {
                  switch (name) {
                     case "Miami":
                     name = "Miami (FL)";
                     break;
                     case "Florida International":
                     name = "FIU";
                     break;
                     case "Southern Mississippi":
                     name = "Southern Miss";
                     break;
                     case "Hawai&#39;i":
                     name = "Hawaii";
                     break;
                     default: ;
                  }
                  return name;
               }

               games = {}
               for (let event of JSON.parse(data).events) {
                  home = convert_team_name(event.competitions[0].competitors[0].team.location);
                  away = convert_team_name(event.competitions[0].competitors[1].team.location);
                  game_info = {};
                  game_info.status = event.competitions[0].status;
                  game_info.status.type.shortDetail = game_info.status.type.shortDetail.split(' EDT')[0];
                  game_info.home = home;
                  game_info.away = away;
                  game_info.home_color0 = '#'+event.competitions[0].competitors[0].team.color;
                  game_info.away_color0 = '#'+event.competitions[0].competitors[1].team.color;
                  game_info.home_color1 = '#'+event.competitions[0].competitors[0].team.alternateColor;
                  game_info.away_color1 = '#'+event.competitions[0].competitors[1].team.alternateColor;
                  game_info.home_logo = event.competitions[0].competitors[0].team.logo;
                  game_info.away_logo = event.competitions[0].competitors[1].team.logo;
                  game_info.home_score = event.competitions[0].competitors[0].score;
                  game_info.away_score = event.competitions[0].competitors[1].score;
                  game_info.home_winner = event.competitions[0].competitors[0].winner || false;
                  game_info.away_winner = event.competitions[0].competitors[1].winner || false;
                  if (game_info.home_winner) {
                     game_info.winner = game_info.home;
                  } else if (game_info.away_winner) {
                     game_info.winner = game_info.away;
                  } else {
                     game_info.winner = '';
                  }
                  games[home] = game_info;
                  games[away] = game_info;
               }
               res.send({success: true, games: games});
            }
            });
         } catch (e) {
            res.send({success: false, message: "Unable to Load Games"});
         }
   });


   return router;
}
