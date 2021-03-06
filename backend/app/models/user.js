var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
   // id: { type: String, required: true, unique: true},
   first: { type: String, required: true},
   last: { type: String, required: true},
   username: { type: String, required: true, unique: true},
   password: { type: String, required: true},
   email: {type: String, required: true, unique: true}
});

UserSchema.pre('save', function(next) {
   var user = this;
   bcrypt.hash(user.password, null, null, function(err,hash) {
      if (err) return next(err);
      user.password = hash
      next();
   });
});

UserSchema.methods.comparePassword = function(password) {
   return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('update', function(next) {
   var update = this._update;
   if (update.$set.password) {
      var user = this;
      bcrypt.hash(update.$set.password, null, null, function(err,hash) {
         if (err) return next(err);
         update.$set.password = hash
         next();
      });
   } else {
      next();
   }

});


UserSchema.methods.comparePassword = function(password) {
   return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User',UserSchema);
