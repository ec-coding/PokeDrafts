const mongoose = require('mongoose')
const user = require('./user')

// THE MODEL IS THE ONLY THING THAT ALLOWS US TO TALK TO THE DATABASE

const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        // trim: true
    },
    value: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // How are these defined?
    cardCount: {
        type: Number,
        default:0,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// What is 'Decks' ?
// It is the name of the database that is created on MongoDB
module.exports = mongoose.model('Decks', DeckSchema)