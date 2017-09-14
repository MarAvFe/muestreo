var mysql      = require('mysql');
var express = require('express');
const bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

var connection = mysql.createConnection({
  host     : '192.168.100.17',
  user     : 'root',
  password : '123456',
  database : 'dummySampling'
});

connection.connect();

/*connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log(JSON.stringify(results));
});*/


//GET seleccionar todo los campos de la tabla 
app.get('/api/getPersons', function(req,resp){
	connection.query("SELECT * FROM user", function(error,rows,fields){
		if(!!error){
			console.log('error in the query');

		}else{
			console.log("Succesful");
			console.log(JSON.stringify(rows));
		}

	  });
})

//GET procedimiento getSelectedPersons
app.get('/api/getSelectedPersons', function(req,resp){
	connection.query("CALL pSelectPersons", function(error,result){
		if(!!error){
			console.log('error in the query');

		}else{
			console.log("Llamando procedimiento");
			resp.send(result);
		}

	  });
})


//POST procedimineto InsertUser
app.get('/api/insertUser2', function(req,resp){
	var name = 'Karen';
	var lastname = 'Navarro';
	var born = '1995-10-10';
	var experience = '10';
	var lefty = 1 ;
	var params = [name,lastname,born , experience , lefty];
	
var sql =connection.query("CALL pInsertUser(?,?,?,?,?)", params , function(error,result){
		if(!!error){
			console.log('error in the query');

		}else{
			console.log("Llamando procedimiento");
			console.log(JSON.stringify(result));
		}

	  });
});

//POST InsertUser
app.post('/api/InsertUserParams', function(req,res,next){
	
	let pars = req.body;
	console.log(JSON.stringify(pars));
	console.log(JSON.stringify(req.body));
	
	var procedure = "CALL pInsertUser(?,?,?,?,?)";
	connection.query(procedure,[pars.name,pars.lastname,pars.born,pars.experience,pars.lefty],function(error,result){
		if(!!error){
			console.log('error in the query');

		}else{
			console.log("Llamando procedimiento");
			console.log(JSON.stringify(pars));
			res.send(result);
		}

});
});





app.post('/prueba', function(req,res,next){
	let resp = {};
    resp.method = req.method;
    resp.params = req.params;
    resp.query = req.query;
    resp.path = req.path;
    resp.body = req.body;
    console.log(JSON.stringify(resp));
    return resp;
})


//POST procedimineto InsertUser
app.get('/api/insertUser', function(req,resp){
	
var sql =connection.query("CALL pInsertUser(?,?,?,?,?)", ['Marcello','Avila','1995-07-13' , '2' , false], function(error,result){
		if(!!error){
			console.log('error in the query');

		}else{
			console.log("Llamando procedimiento");
			console.log(JSON.stringify(result));
		}

	  });
});


app.listen(3000);

