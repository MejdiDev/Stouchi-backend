
var express = require("express");
var router = express.Router();
var revenu = require('./../models/revenu.js');
const { getRevenuList, createRevenu, deleteRevenu, updateRevenu } = require("../controllers/revenu_controller");

// Post new revenu
router.post("/add", createRevenu)

// Get revenus
router.post("/get", getRevenuList)

// Delete revenus by id
router.delete("/delete", deleteRevenu)

// Update revenus / id
router.put("/put", updateRevenu)

// exporting
module.exports = router ;