
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
        
        // User.updateOne({ 
        //     "username" : req.params.username,
        // },
        //     'game1'.push(req.body.score)
        // )
        // .then(updatedUser => {
        //     res.status(200).json(updatedUser);
        // })
        // .catch(error=>{
        // });
    }
)
router.put(
    "game2/:username",
    (req, res)=>{
        User.updateOne({ 
            "username" : req.params.username,
        },
            'game2'.push(req.body.score)
        )
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(error=>{
        });
    }
)
router.put(
    "game3/:username",
    (req, res)=>{
        User.updateOne({ 
            "username" : req.params.username,
        },
            'game3'.push(req.body.score)
        )
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(error=>{
        });
    }
)

router.get("", (req, res) => {
    User.find().then(userDocuments => {
        res.status(200).json(userDocuments);
    });
});

router.delete("delete-all", (req, res, next) => {
    User.deleteMany( function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    });
});

module.exports = router;