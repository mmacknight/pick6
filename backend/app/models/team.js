var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
   userid: { type: String, required: true},
   leagueid: { type: String, required: true},
   role: { type: String },
   school0: { type: String },
   school1: { type: String },
   school2: { type: String },
   school3: { type: String },
   school4: { type: String },
   school5: { type: String }
});


module.exports = mongoose.model('Team',TeamSchema);
