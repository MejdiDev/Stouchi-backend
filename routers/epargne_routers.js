
var express = require("express");
var router = express.Router();
var epargne = require('./../models/epargne.js');
const { getEpargneList, createEpargne, deleteEpargne } = require("../controllers/epargne_controller");

// Post new depense
router.post("/add", createEpargne)

// Get epargne
router.post("/get", getEpargneList)

// Delete epargne by id
router.delete("/delete", deleteEpargne)

// Update epargne / id
router.put("/put/:id", function(req, res){
	epargne.findByIdAndUpdate(req.params.id, {
		$set: {
			date:req.body.date,
			montantE:req.body.montant,
			user: req.body.userId,
		
		}
	},
	{
		new: true
	}, (err,epargnes) =>{
		if (err) {
			res.json({success: false, description: "Update epargne", error: err})
		} else {
			res.json({success: true, description: "Update epargne", message: "User epargne", data: epargnes})
		}
	})
})

// exporting
module.exports = router;