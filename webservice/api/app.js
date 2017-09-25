var express = require("express");
var passport = require("passport");

var conf = require("../conf/default.json").express;

/**
 * Start the API
 * @constructor
 */
function app(connection) {
	var app = express(); //start API
	var session  = require('express-session');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var morgan = require('morgan');
	var flash = require('connect-flash');
	console.info("Server running on port " + conf.port + ".");
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, access-control-allow-headers");
		next();
	});

	require('./passport')(connection); // pass passport for configuration

	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// required for passport
	app.use(session({
		secret: 'kEEpOnRolliNgLiketHeMAKINA',
		resave: true,
		saveUninitialized: false,
		name: 'muestreo.sid'
	} )); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.listen(conf.port); //port set on conf file
	return app;
}

exports.app = app;
