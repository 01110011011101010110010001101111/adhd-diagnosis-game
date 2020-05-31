
const mongoose = require("mongoose");
const express = require("express");

const Game = require("../models/game");

const router = express.Router();

router.post("", function(req, res) {
        
    const data = new Game({
      name: req.body.name,
      desc: req.body.desc
    });

    data.save().then(doc => {
        res.status(201).json(doc);
    })
    .catch(error => {
    });

});

router.get("", (req, res) =>{
    Game.find().then(doc => {
        res.status(200).json(doc);
    })
    .catch(err =>{
    })
});

module.exports = router;