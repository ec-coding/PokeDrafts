const mongoose = require('mongoose')
const user = require('./user')

const CardSchema = new mongoose.Schema({
    name: [{
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'Decks',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Cards', CardSchema)