const Decks = require('../models/decks')
const Cards = require('../models/cards')

module.exports = {
    getProfile: async (req, res) => {
        console.log(req.user)
        try {
            req.body.user = req.user.id
            const cards = await Decks.find({ user:req.user.id }).lean()
            const cardName = req.body.name
            let cardCount = await Decks.countDocuments({ 
                user: req.user.id
             })
            parseInt(cardCount)
            res.render('decks.ejs', {
                name: req.user.firstName,
                cards,
                quantity: cardCount,
                cardName
                // ofEachCard: specificCardCount
            })
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
    getCards: async (req, res) => {
        try {
            res.render('decks.ejs', { 
                cards: results 
            })
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
    putCardName: async (req, res) => {
        try {
            const cardName = await Decks.findById(req.params.id);
            res.render('decks.ejs', { 
                cardName
            })
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
    createDeck: async (req, res) => {
        try {
            req.body.user = req.user.id
            let result = await Cards.create({
                name: req.body.name,
                user: req.user.id
            })
            res.json(result)
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
    createDeckCard: async (req, res) => {
        try {
            req.body.user = req.user.id
            let result = await Decks.create({
                name: req.body.name,
                value: req.body.value,
                user: req.body.user,
            })
            res.json(result)
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
    // countCardQuantity: async (req, res) => {
    //     try {

    //         console.log(cardCount)
    //         res.render('decks.ejs', {
    //             quantity: cardCount,
    //         })
    //         res.json('')
    //     } catch (err) {
    //         return res.render('error/500')
    //     }
    // },
    countDeckCard: async (req, res) => {
        try {

            console.log(cardCount)
            res.render('decks.ejs', {
                quantity: cardCount,
            })
            res.json('')
        } catch (err) {
            return res.render('error/500')
        }
    },
    deleteCard: async (req, res) => {
        try {
            await Decks.deleteOne({ _id: req.body.id })
            console.log(`Deleted card`)
            res.json('')
        } catch (err) {
            return res.render('error/500')
        }
    },
    deleteDeck: async (req, res) => {
        try {
            const userID = req.user.id
            await Decks.deleteMany({ 
                user: userID
             })
            res.json('')
            console.log(`Deleted deck`)
        } catch (err) {
            return res.render('error/500')
        }
    }
}