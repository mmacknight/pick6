var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueSchema = new Schema({
   // id: { type: String, required: true, unique: true},
   name: { type: String, required: true, unique: true},
   admin: { type: String, required: true}
});


module.exports = mongoose.model('League',LeagueSchema);
