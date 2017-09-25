// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')
var dbconfig = require("../conf/default.json");
var connection = mysql.createConnection(dbconfig.mysql);

// expose this function to our app using module.exports
module.exports = function() {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("Serializing: " + JSON.stringify(user));
        done(null, user.cedula);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("Deserializing: " + id);
        connection.query("SELECT cedula, name, lastName, email, phone FROM sampling.User WHERE cedula = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'pUser',
            passwordField : 'pPwd'
        },
        function(username, password, done) { // callback with email and password from our form
            quer = "Select cedula From sampling.User Where (cedula = '"+username+"' or email = '"+username+"') and pwd = '"+password+"';"
            connection.query(quer, function(err, rows){
                if (err) return done(err);
                console.log("ROWS: "+JSON.stringify(rows));
                if (rows.length < 1) {
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash
                }

                // // if the user is found but the password is wrong
                // if (!bcrypt.compareSync(password, rows[0].password))
                //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
