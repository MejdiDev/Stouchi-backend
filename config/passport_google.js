'use strict';
var express = require("express");
var router = express.Router();
const config = require('./database');
var JwtStrategy = require('passport-jwt').Strategy;
var  ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models/user');
var passport=require('passport');
var GoogleStrategy =require('passport-google');

// Exporting
module.exports = (passport_google) => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
  passport.use(new GoogleStrategy({
    clientID: '669840382372-7b65ejfp09o1o7319rqf7ad0sukar4hh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://localhost:8081/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }));
}
router.get('/flogin',
  passport.authenticate('google'));

router.get('/auth/google/redirect',
  passport.authenticate('google', { session :false }),
  function(req, res) {
    res.send('AUTH WAS GOOD!')
});