'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const user = require("./user.js");
var ObjectId = Schema.ObjectId;

var BudgetSchema = new Schema({
    
    date: {
        type: String,
        required: true
    },
    montant: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: user.modelName 
    }
});



//exporting module
var Budget = module.exports = mongoose.model('Budget', BudgetSchema);