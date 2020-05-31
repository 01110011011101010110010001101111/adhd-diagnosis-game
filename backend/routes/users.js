
const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post("/register", function(req, res) {
    // console.log("i'm here");
      const userdata = new User({
        name: req.body.name,
        username: req.body.username,
      });
      userdata.save().then(createdUser => {
          res.status(201).json({data: true});
      })
      .catch(error => {
        res.status(500).json(error);
    });
  }
);

router.get("/login", function(req, res) {
      User.findOne({"username" : req.body.username})
      .then(doc => {
          res.status(201).json({data : doc});
      })
      .catch(error => {
        res.status(500).json(error);
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
    }
)

router.get("", (req, res) => {
    User.find().then(userDocuments => {
        res.status(200).json(userDocuments);
    });
});

module.exports = router;