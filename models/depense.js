'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var DepenseSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  montantD: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
});




//exporting module
var Depense = module.exports = mongoose.model('Depense', DepenseSchema);