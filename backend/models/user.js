const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique : true, dropDups: true },
    game1: [ {type:Number} ],
    game2: [ {type:Number} ],
    game3: [ {type:Number} ],
});

module.exports = mongoose.model('User', userSchema, 'users');