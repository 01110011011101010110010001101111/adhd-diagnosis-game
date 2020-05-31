const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./backend/models/user");
var mongodb = 'mongodb+srv://mmudit:uMuiTl4JaM7RAvYn@cluster0-xcjvq.mongodb.net/adhd-app?retryWrites=true&w=majority'

mongoose.connect(
    mongodb,
    { useNewUrlParser: true },
    err => {
        if (err) 
            throw err;
        console.log(`Successfully connected to database.`);
    }
);


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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

// app.use(express.static(__dirname + '/index.html'));
app.use(express.static(path.join(__dirname, 'adimad')));
app.use(express.static(path.join(__dirname, 'Game1')));
app.use(express.static(path.join(__dirname, 'Song_Game')));

const apiUser = require("./backend/routes/users");
// const apiGame = require("./backend/routes/game");
// app.use('/api/games',apiGame);

app.use('/api/users',apiUser);



app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, 'adimad', 'register.html'))
});
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'adimad', 'login.html'))
});

app.get('/game1', (req,res) => {
    res.sendFile(path.join(__dirname, 'Game1', 'game1.html'))
});
app.get('/game2', (req,res) => {
    res.sendFile(path.join(__dirname, 'Song_Game', 'singsong.html'))
});

app.get('/home', (req,res) => {
    res.sendFile(path.join(__dirname, 'adimad', 'gameHome.html'))
});
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, 'adimad', 'gameHome.html'))
});

app.listen(process.env.PORT || 3000)
    .once("listening", ()=>{
        console.log("started on http://localhost:3000 ");
    })
    .on("error", (err)=>{
        console.log("ERror "+ err);        
    });
