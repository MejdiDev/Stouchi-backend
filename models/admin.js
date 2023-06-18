'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcryptjs');

var AdminSchema = new Schema({
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
  }
});


//hashing a password before saving
AdminSchema.pre('save', function(next){
  var Admin = this;
    bcrypt.hash(Admin.password, 10 ,function (err,hash) {
      if(err){return nes (err);}
      else{
          Admin.password= hash;
          next();
      }
  })
})

//exporting module
var Admin = module.exports = mongoose.model('Admin', AdminSchema);