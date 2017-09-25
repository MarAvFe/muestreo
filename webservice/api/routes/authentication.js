var express = require("express");
var conf = require("../../conf/default.json").mysql;
var passport = require('passport');
var bodyParser = require('body-parser');

/**
* Get all the available table descriptions in the database.
* @function tables
*/

exports.router = function(connection) {

    var router = express.Router();
    var get = express.Router();

    // process the login form
    get.post('/register', passport.authenticate('local-register'), function(req, res) {

        let resp = {};
        resp.method = req.method;
        resp.path = req.path;
        resp.body = req.body;
        console.log(JSON.stringify(resp));
        console.log('req.session: ' + JSON.stringify(req.session));
        return res.status(200).json({data: "Success", error: null});
    });

    // process the login form
    get.post('/login', passport.authenticate('local-login'), function(req, res) {
        if (req.body.remember) {
            req.session.cookie.expires = false;
        } else {
            req.session.cookie.maxAge = 1000 * 60 * 10;
        }
        console.log('req.session: ' + JSON.stringify(req.session));
        return res.status(200).json({data: req.user.cedula, error: null});
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    get.post('/logout', function(req, res) {
        req.session.cookie.maxAge = 1; // 1 millisec
        req.logout();
        return res.status(200).json({data: 'Logged out.', error: null});
    });

    router.use("/auth", get);

    return router;
}
