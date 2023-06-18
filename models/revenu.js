var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const RevenuSchema= mongoose.Schema({

  date: {
    type: String,
    required: true,
    
  },
  categorie: {
    type: String,
    required: true,
    
  },
  montantR: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
});




//exporting module
module.exports = Revenu=mongoose.model('Revenu',RevenuSchema);
