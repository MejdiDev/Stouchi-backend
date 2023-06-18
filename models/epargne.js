'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var EpargneSchema = new Schema({
    
    date: {
        type: String,
        required: true
    },
    montantE: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User' 
    }
});



//exporting module
var Epargne = module.exports = mongoose.model('Epargne', EpargneSchema);