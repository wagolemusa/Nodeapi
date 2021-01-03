const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')


app.use(morgan('short'))
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}))

const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('./encode.db')

const soundex = require('soundex-code') //include the soundex library
const doubleMet= require('double-metaphone')  //include the double metaphone library

app.post('/create', (req, res) =>{
    let gander = req.body.gander
    let dob = req.body.dob
    let f_name = req.body.fname
    let l_name = req.body.lname
    let fname = soundex(f_name)
    let lname = doubleMet(l_name)
    let pkv1=gander+fname+lname[0]+dob
    let pkv2=gander+fname+lname[1]+dob
    db.run("INSERT into customer(gander, dob, fname, lname, pkv1, pkv2) values('"+gander+"', '"+dob+"', '"+fname+"','"+lname+"', '"+pkv1+"','"+pkv2+"')",function(err,row){
        if(err){
            console.log(err.message)
        }
        console.log("Entry added to table")
        res.send("New Customer has ben added")
    });
    res.end()
})

// app.get("/", (req, res)=> {
//     console.log("Responding to root route")
//     res.send("Hello from Rooot")
// })

// app.get("/users", (req, res) => {
//     let db = new sqlite.Database('./encode.db')
//     db.all("SELECT * FROM customer", (err, rows, fields) =>{
//         console.log("I think the data was Fetched")
//         res.json(rows)
//     })
  
// })

app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})

// npm install double-metaphone
// npm install soundex-code
// npm i body-parser
// npm install sqlite3
// sudo npm i -g nodemon
// npm install express
// npm init
// node app.js