/**
 * Routes all paths contained in routes folder to main app.
 * @constructor
 * @param app - Express app
 * @param connection - DB connection
 */
exports.route = function (app, connection) {

	// If gen==true, the server started for generating ws,
	// so no authentication blocking will be set.
	var options = require('node-options');
	var opts =  { "gen" : false };
	var result = options.parse(process.argv.slice(2), opts);
	opts.gen = opts.gen=='true'?1:0;

	/**
	 * Routes single file.
	 * @memberOf route
	 * @param {String} path - File name with the router
	 */
	addToApp = function (path) {
		var tempRouter = require("." + path).router(connection);
		if (opts.gen < 1) {
			//console.log("path: " + path);
			if((path !== './api/routes/authentication.js')) tempRouter.use(isLoggedIn);
		}
		app.use("/", tempRouter);
	}

	var files = getFiles("./api/routes");
	files.forEach(function (file) {
		addToApp(file);
	});

}

/**
 * Get all files on first level from folder.
 * @memberof route
 * @param {String} dir - Folder path
 */

function getFiles(dir) {

	var filesystem = require("fs");
	var results = [];

	filesystem.readdirSync(dir).forEach(function (file) {

		var stat = filesystem.statSync(dir + '/' + file);

		if (!stat.isDirectory()) {
			results.push(dir + "/" + file);
		} else {
			subresults = getFiles(dir + "/" + file);
			for (i = 0; i < subresults.length; i++) {
				results.push(subresults[i]);
			}
		}

	});

	return results;

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	return res.status(401).json({data:'Unauthenticated'});
}
