var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
   userid: { type: String, required: true},
   leagueid: { type: String, required: true},
   school0: { type: String },
   school1: { type: String },
   school2: { type: String },
   school3: { type: String },
   school4: { type: String },
   school5: { type: String },
});

TeamSchema.index({ userid: 1, leagueid: 1}, { unique: true });


module.exports = mongoose.model('Team',TeamSchema);
