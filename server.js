// import our dependencies
const express = require("express")
const app =express()
const mysql2 = require("mysql2");
const dotenv = require("dotenv")


// configure environment variables
dotenv.config();

// create a connection object
const db = mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err)=>{
    // if the conn is not successful 
    if(err){
         return console.log("error connecting to the database: " ,err)

    }
    // connection is successful
    console.log("Successfully connected to mySQL: ",db.threadId)
})

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

// GET
// POST
// PUT
// DELETE
// retrieve all patients
// start and listen to the server

// question 1
app.get('',(req, res)=>{
    const getPatients = "SELECT patient_id,first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients,(err,data)=>{
        if(err){
            return res.status(400).send("Failed to get patients"), err
        }
        // res.status(200).render('data',{data})
        res.status(200).send(data)
    })
});

// question 2
app.get('/providers', (req, res)=>{
    const getProviders = "SELECT first_name, last_name,provider_specialty FROM providers"
    db.query(getProviders,(err, data)=>{
        if(err){
            return res.status(400).send("Failed to get providers"), err
        }
        res.status(200).send(data)
    });
});

// question 3
app.get('/patient_fname', (req, res)=>{
    const patient_fname = "SELECT first_name FROM patients"
    db.query(patient_fname,(err,data)=>{
        if(err){
            return res.status(400).send("failed to get patients first name"), err
        }
        res.status(200).send(data)
    });
});
// question 4
app.get('/provider_specialty', (req,res)=>{
    const provider_specialty = "SELECT provider_specialty FROM providers "
    db.query(provider_specialty,(err, data)=>{
        if (err){
            return res.status(400).send("failed to get provider provider_specialty"), err
        }
        res.status(200).send(data)
    });
});
app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})
