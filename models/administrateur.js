'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcryptjs');

var AdministrateurSchema = new Schema({
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
AdministrateurSchema.pre('save', function(next){
  var Admin = this;
    bcrypt.hash(Administrateur.password, 10 ,function (err,hash) {
      if(err){return nes (err);}
      else{
          Admin.password= hash;
          next();
      }
  })
})

//exporting module
var Administrateur = module.exports = mongoose.model('Administrateur', AdministrateurSchema);