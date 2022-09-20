const mongoose = require('mongoose')
const user = require('./user')
const Cards = require('./cards')

const DeckSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cards: [
        Cards
    ]
})

module.exports = mongoose.model('Decks', DeckSchema)