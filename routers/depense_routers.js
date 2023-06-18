
var express = require("express");
var router = express.Router();
var depense = require('./../models/depense.js');
const async = require('async');
var randomstring = require("randomstring");
var config = require("./../config/connection");

// Post new depense
router.post("/add", async(req,res)=>{
    const {user,categorie,date,montantD} = req.body
	depense = await new depense({user,categorie,date,montantD}).save();

    if(depense) res.json(depense)

})

// Get depense
router.get("/get", function(req, res){
	depense.find(function(err, depenses){
		if (err) {
			res.json({success: false, description: "Get all depense", error: err})
		} else {
			res.json({success: true, description: "Get all depense", data: depenses})
		}
	})
})

// Get depense by id
router.get("/:id", function(req, res){
	depense.findOne({_id: req.params.id}, function(err, depenses){
		if (err) {
			res.json({success: false, description: "Get  depense", error: err})
		} else {
			res.json({success: true, description: "Get  depense", data: depenses})
		}
	})
})

// Delete budget by id
router.delete("/delete/:id", function(req, res){
	depense.remove({_id: req.params.id}, (err, done) => {
		if (err) {
			res.json({success: false, description: "Delete depense", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete depense", message: "depense not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new depense", message: "depense deleted"})
		}
	})
})

// Update budget / id
router.put("/put/:id", function(req, res){
	depense.findByIdAndUpdate(req.params.id, {
		$set: {
			date:req.body.date,
			montantD:req.body.montant,
			categorie:req.body.categorie,
			user: req.body.userId,
		
		}
	},
	{
		new: true
	}, (err,depenses) =>{
		if (err) {
			res.json({success: false, description: "Update depense", error: err})
		} else {
			res.json({success: true, description: "Update depense", message: "User depense", data: depenses})
		}
	})
})

// exporting
module.exports = router ;