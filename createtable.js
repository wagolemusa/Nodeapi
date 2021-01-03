const sqlite = require('sqlite3').verbose()

let db = new sqlite.Database('./encode.db')

db.run('CREATE TABLE customer(id INTEGER PRIMARY KEY, gander char(1), dob text NOT NULL, fname text NOT NULL, lname text NOT NULL,  pkv1 text NOT NULL, pkv2 text NOT NULL);',function(err){
	if(err){
		return console.log(err.message)
	}
	console.log('Table create')
})
db.close()