var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
   userid: { type: String, required: true, unique: true},
   leagueid: { type: String, required: true}
});


module.exports = mongoose.model('Team',TeamSchema);
