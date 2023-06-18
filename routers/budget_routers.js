
var express = require("express");
var router = express.Router();
var budget = require('./../models/budget.js');
const { getbudgetList, createbudget, deletebudget } = require("../controllers/budget_controller");

// Post new budget
router.post("/add", createbudget)

// Get budget
router.post("/get", getbudgetList);

// Delete budget by id
router.delete("/delete", deletebudget)

// Update budget / id
router.put("/put/:id", function(req, res){
	budget.findByIdAndUpdate(req.params.id, {
		$set: {
			date:req.body.date,
			montant:req.body.montant,
			user: req.body.userId,
		
		}
	},
	{
		new: true
	}, (err,budgets) =>{
		if (err) {
			res.json({success: false, description: "Update budget", error: err})
		} else {
			res.json({success: true, description: "Update budget", message: "User revenu", data: budgets})
		}
	})
})

// exporting
module.exports = router ;