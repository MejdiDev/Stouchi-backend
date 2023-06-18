'use strict';
const port = 8081;
var http = require("http");
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const async = require('async');
var config= require('./config/database');
var db= require('./config/connection');
var app = express();

// import
mongoose.connect("mongodb+srv://dhouhamansour199:dhouha96086100@cluster0.leyhjyl.mongodb.net/MONEYMINDER",)
.then(() => console.log('Connected Successfully'))

.catch((err) => {console.error(err);});
// Express application
var app = express();


// parse application/json
app.use(bodyParser.json({limit: '10mb'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
// Get Index
app.get("/", function(req, res){
	res.end("Index")
})
//user
var user = require('./routers/user_routers.js')
app.use('/api/users',user)

var budgets = require('./routers/budget_routers')
app.use('/api/budgets',budgets)

var revenu = require('./routers/revenu_routers')
app.use('/api/revenu',revenu)

//admin
var admin = require('./routers/administrateur_routers.js')
app.use('/api/admins',admin)

//depense
var depense = require('./routers/depense_routers.js')
app.use('/api/depenses',depense)

//epargne
var epargne = require('./routers/epargne_routers.js')
app.use('/api/epargnes',epargne)

app.listen( port,()=>{
    console.log("Welcome to MoneyMinder");
})