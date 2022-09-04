const { request } = require('express')
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Decks = require('../models/decks')

db = client.db(dbName)

const cardsCollection = db.collection('cards')


// // @desc    Show add page
// // @route   GET /decks/add
// router.get('/add', ensureAuth, (req, res) => {
//     res.render('decks/add')
// })

// @desc    Get collection of cards and render it on your index.ejs
// @route   GET /
router.get('/', ensureAuth, async, (req, res) => {
    try {
        db.collection('cards').find().toArray()
        res.render('index.ejs', { cards: results })
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Clones the card you clicked from search results and places it in the deck
// @route   POST /cards
router.post('/cards', ensureAuth, async (req, res) => {
    try {
        cardsCollection.insertOne(req.body)
            .then(result => {
                res.json(result)
            })
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Deletes a single card upon clicking it
// @route   DELETE /delete-single-card
router.delete('/delete-single-card', ensureAuth, async (req, res) => {
    try {
        cardsCollection.deleteOne(
            {
                '_id': ObjectId(req.body.id)
            },
        )
            .then(result => {
                // if (result.deletedCount === 0) {
                //     return res.json('No decks to delete')
                // }
                res.json('')
            })
    } catch (error) {
        return res.render('error/500')
    }
})

// @desc    Deletes all cards upon clicking the "Delete Deck" button
// @route   DELETE /delete-all-cards
router.delete('/delete-all-cards', ensureAuth, async (req, res) => {
    try {
        cardsCollection.deleteMany()
            .then(result => {
                // if (result.deletedCount === 0) {
                //     return res.json('No decks to delete')
                // }
                res.json('')
            })
    } catch (error) {
        return res.render('error/500')
    }

})

module.exports = router