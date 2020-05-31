
const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post("/register", function(req, res) {
        
    console.log("i'm here");
    
      const userdata = new User({
        name: req.body.name,
        username: req.body.username,
      });

      userdata.save().then(createdUser => {
          res.status(201).json(createdUser);
      })
      .catch(error => {
      });
  }
);

router.put(
    "/game1/:username",
    (req, res)=>{
        console.log(req.params.username);
        console.log(req.body.score);
        
        User.updateOne({"username" : req.params.username},
            { $push: { 'game1': req.body.score } }
        )
        .then(updatedUser => {
            res.status(200).json({data: true});
        })
        .catch(error=>{
            res.status(500).json(error);
        });
        // res.status(200).json(req.params.username);
    }
)

router.put(
    "/game2/:username",
    (req, res)=>{
        console.log(req.params.username);
        console.log(req.body.score);
        
        User.updateOne({"username" : req.params.username},
            { $push: { 'game2': req.body.score } }
        )
        .then(updatedUser => {
            res.status(200).json({data: true});
        })
        .catch(error=>{
            res.status(500).json(error);
        });
        // res.status(200).json(req.params.username);
    }
)
router.put(
    "/game3/:username",
    (req, res)=>{
        console.log(req.params.username);
        console.log(req.body.score);
        
        User.updateOne({"username" : req.params.username},
            { $push: { 'game3': req.body.score } }
        )
        .then(updatedUser => {
            res.status(200).json({data: true});
        })
        .catch(error=>{
            res.status(500).json(error);
        });
        // res.status(200).json(req.params.username);
    }
)

router.get("", (req, res) => {
    User.find().then(userDocuments => {
        res.status(200).json(userDocuments);
    });
});

module.exports = router;