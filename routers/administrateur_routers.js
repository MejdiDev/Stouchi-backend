'use strict';

var express = require("express");
var router = express.Router();
var admin = require('../models/administrateur.js');
const async = require('async');
var bcrypt = require("bcryptjs");
var config = require("../config/connection.js")

//add
router.post("/", function(req, res, next){
	try{
		async.waterfall ([
			(callback) => {
				admin.findOne({email: req.body.email}, (err, admin_exist) => {
					if (err) {return next(err);}
					else if (admin_exist){
						res.json({success: false, description: 'post admin', message :'email allrady exist'})
					}
					else {
						callback();
					}
				})
			},
			(callback) => {
				
				let new_admin = new admin({
				email:req.body.email,
				password:req.body.password,
				created: Date.now()
			})
			new_admin.save(function(err, admin){
				if (err) {
				  res.json({success: false, description: "Post administrateur", message: "administrateur  registration failed", error: err})
				} else {
					//mail config
					var mailOptions = {
							form:'sfc.isgs@gmail.com',
							to: administrateur.email,
							generateTextFromHTML: true
						};
					transporter.sendMail(mailOptions, function(error, info){
						if (error){
							console.log(error);
						}else {
							console.log('email sent:'+info.response);
						}
						transporter.close();
					});
				 	callback(null, admin)
				}
			})
		},
		(err, results) => {
			res.json({success: true, description: "Post admin", message: "admin registred", data: results})
			   }
		])
	} catch (err) {
		console.error({
			success: false,
			description: "Post admin",
			error: err
		});
	}
})

// Authentication
	router.post("/authenticate", (req, res, next) => {
		try{
			async.waterfall([
				(callback) => {
					admin.findOne({email: req.body.email}, (err, admin_exist) => {
						if (err) { return next(err);}
						else if (!admin_exist) {
							res.json({success: false,
							description: "admin authentication",
							message: "Email not exist"
						});
						} else {
							callback(null, admin_exist);
						}
					})
				},
				(admin, callback) => {
					bcrypt.compare(req.body.password, admin.password, (err, isMatch) => {
						if (err) { return next(err);}
						else if (!isMatch) {
							res.json({success: false,
							description: "admin authentication",
							message: "Wrong password"
						});
						} else {
							callback(null, admin);
						}
					})
				}
			], (err, results) => {
				const token = jwt.sign(results.toJSON(), config.secret,{
					expiresIn: 604800 // une semaine
				})
				res.json({success: true,
					description: "admin authentication",
					message: "Welcome again",
					token: 'jwt ' +token,
					data: results
				});
			})
		} catch (err) {
			console.error({
				success: true,
				description: "admin authentication",
				error: err
			})
		}
	})

// Get admin
router.get("/", function(req, res){
	    admin.find(function(err, admin){
		if (err) {
			res.json({success: false, description: "Get administrateur", error: err})
		} else {
			res.json({success: true, description: "Get administrateur", data: admin})
		}
	})
})
// Get admin by id

router.get("/:id", function(req, res){
	admin.findOne({_id: req.params.id}, function(err, admin){
		if (err) {
			res.json({success: false, description: "Get  administrateur", error: err})
		} else {
			res.json({success: true, description: "Get  administrateur", data: admin})
		}
	})
})
// Delete admin by id
router.delete("/:id", function(req, res){
	admin.remove({_id: req.params.id}, (err, done) => {
		if (err) {
			res.json({success: false, description: "Delete administrateur", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete administrateur", message: "admin not deleted, try again"})
		} else {
			res.json({success: true, description: "Get administrateur", message: "admin deleted"})
		}
	})
})
// Update admin / id
router.put("/:id", function(req, res){
	admin.findByIdAndUpdate(req.params.id, {
		$set: {
			email:req.body.email,
			password:req.body.password,
			created:req.body.created,
			updated:req.body.updated

		}
	},
	{
		new: true
	}, (err, admin) =>{
		if (err) {
			res.json({success: false, description: "Update administrateur", error: err})
		} else {
			res.json({success: true, description: "Update administrateur", message: "Good", data: admin})
		}
	})
})

// exporting
module.exports = router ;