
const Decks = require('../models/decks')

module.exports = {
    getProfile: async (req, res) => {
        console.log(req.user)
        try {
            const cards = await Decks.find({ user:req.user.id }).lean()
            res.render('decks.ejs', {
                name: req.user.firstName,
                cards
            })
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
    getCards: async (req, res) => {
        try {
            // db.collection('cards').find().toArray()
            res.render('decks.ejs', { 
                cards: results 
            })
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
    deleteCard: async (req, res) => {
        try {
            await Decks.deleteOne({ _id: req.body.id })
            console.log(`Deleted card`)
            res.json('')
        } catch (error) {
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
            console.log(`Deleted ${res.deletedCount} cards`)
        } catch (error) {
            return res.render('error/500')
        }
    }
}