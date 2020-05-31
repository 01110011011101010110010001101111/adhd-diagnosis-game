const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique : true, dropDups: true },
    game1: [ Number ],
    game2: [ Number ],
    game3: [ Number ],
});

module.exports = mongoose.model('User', userSchema, 'users');