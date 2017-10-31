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
        'local-register',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password'
        },
        function(username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            userObj = JSON.parse(username);
            connection.query("SELECT * FROM User WHERE cedula = ? or email = ?",[userObj.pCedula,userObj.pEmail], function(err, rows) {
                if (err)
                return done(err);
                if (rows.length) {
                    console.log("rows: " + JSON.stringify(rows));
                    return done(null, false);
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUser = {
                        pName: userObj.pName,
                        pLastname: userObj.pLastname,
                        pEmail: userObj.pEmail,
                        cedula: userObj.pCedula,
                        pPhone: userObj.pPhone,
                        pPwd: bcrypt.hashSync(password) // use the generateHash function in our user model
                    };
                    var insertQuery = "INSERT INTO User ( name, lastname, email, cedula, phone, pwd ) values (?,?,?,?,?,?)";
                    connection.query(insertQuery,[
                        newUser.pName,
                        newUser.pLastname,
                        newUser.pEmail,
                        newUser.cedula,
                        newUser.pPhone,
                        newUser.pPwd,
                    ],function(err, rows) {
                      if (!err) {
                        console.log('nUs'+ JSON.stringify(rows));
                        newUser.id = rows.insertId;
                        return done(null, newUser);
                      }
                      console.log("ERR: passport.js. " + err);
                      return done(null, false);
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
            quer = "Select cedula, pwd From sampling.User Where cedula = '"+username+"' or email = '"+username+"';"
            connection.query(quer, function(err, rows){
                if (err) return done(err);
                if (rows.length < 1) {
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].pwd)){
                    console.log("failedCmpareSync.");
                    return done(null, false);
                }

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
