var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
   // id: { type: String, required: true, unique: true},
   school: { type: String, required: true, unique: true},
   team_name: { type: String, required: true, unique: true},
   mascot: {type: String},
   conference: { type: String},
   division: { type: String},
   primary_color: { type: String },
   secondary_color: { type: String },
   wins: {type: Number}
});


module.exports = mongoose.model('School',SchoolSchema);
