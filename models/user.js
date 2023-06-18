'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }, 
  solde: {
    type: Number,
  }
});


//hashing a password before saving
UserSchema.pre('save', function(next){
  var User = this;
    bcrypt.hash(User.password, 10 ,function (err,hash) {
      if(err){return nes (err);}
      else{
          User.password= hash;
          next();
      }
  })
})

//exporting module
var User = module.exports = mongoose.model('User', UserSchema);