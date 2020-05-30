const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./backend/models/user");
var mongodb = 'mongodb+srv://mmudit:uMuiTl4JaM7RAvYn@cluster0-xcjvq.mongodb.net/adhd-app?retryWrites=true&w=majority'

mongoose
    .connect(mongodb)
    .then(() => {
        console.log("Connected to database in server");
    })
    .catch(() => {
        console.log("Connection Failed");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(express.static(__dirname + '/index.html'));

const apiUser = require("./backend/routes/users");
const apiGame = require("./backend/routes/game");

app.use('/api/users',apiUser);
app.use('/api/games',apiGame);

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'))
});

app.listen(process.env.PORT || 3000)
    .once("listening", ()=>{
        console.log("started on http://localhost:3000 ");
    })
    .on("error", (err)=>{
        console.log("ERror "+ err);        
    });
