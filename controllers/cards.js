const Decks = require('../models/decks')
const Cards = require('../models/cards')

module.exports = {
    getProfile: async (req, res) => {
        console.log(req.user)
        try {
            // req.body.user = req.user.id
            // const cards = await Cards.find({ user:req.user.id }).lean()

            // let cardCount = await Cards.countDocuments({ 
            //     user: req.user.id
            //  })
            // parseInt(cardCount)

            let deck = await Decks.findOne({ 
                user:req.user.id 
            })

            if (deck === null) {
                deck = new Decks ()
            }

            const cards = deck.cards
            const cardCount = cards.length
            const cardName = req.body.name
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

    //This function is obsolete, delete this + its route later
    putCardName: async (req, res) => {
        try {
            const cardName = await Cards.findById(req.params.id);
            res.render('decks.ejs', { 
                cardName
            })
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },

    createDeckCard: async (req, res) => {
        try {
            let deck = await Decks.findOne({ 
                user:req.user.id 
            })
            if (deck === null) {
                deck = new Decks ({ 
                    user:req.user.id 
                })
            }
			deck.cards.push(
                {
                    name: req.body.name,
                    value: req.body.value,
                },
                // res.render('decks.ejs', { 
                //     cards
                // })
            )

            deck.save()
            res.json('')
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

    //This is for counting how many of each card are in a deck
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
            const userID = req.user.id
            const deck = await Decks.findOne({ user: userID })
            deck.cards = deck.cards.filter(card => card._id != req.body.id)
            deck.save()
            console.log(`Deleted card`)
            res.json('')
        } catch (err) {
            return res.render('error/500')
        }
    },
    deleteDeck: async (req, res) => {
        try {
            const userID = req.user.id
            await Decks.deleteOne({ 
                user: userID
             })
            res.json('')
            console.log(`Deleted deck`)
        } catch (err) {
            return res.render('error/500')
        }
    }
}