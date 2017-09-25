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
    get.post('/login', passport.authenticate('local-login'), function(req, res) {

        let resp = {};
        resp.method = req.method;
        resp.params = req.params;
        resp.query = req.query;
        resp.path = req.path;
        resp.body = req.body;
        console.log(JSON.stringify(resp));
        if (req.body.remember) {
            req.session.cookie.expires = false;
        } else {
            req.session.cookie.maxAge = 1000 * 60 * 10;
        }
        console.log('req.session: ' + JSON.stringify(req.session));
        return res.json({data: req.user.cedula, error: null});
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    get.post('/logout', function(req, res) {
        req.session.cookie.maxAge = 1; // 1 millisec
        req.logout();
        return res.json({data: 'Logged out.', error: null});
    });

    router.use("/auth", get);

    return router;
}
