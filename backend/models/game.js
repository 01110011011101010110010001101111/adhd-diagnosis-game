const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name : { type : String, required : true },
    desc : { type : String }
});

module.exports = mongoose.model('Game', gameSchema, 'games' );