const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require ('cors');
let port = process.env.PORT || 8000; 
// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectId} = require('mongodb')
require('dotenv').config()


let db,
    dbConnectionStr = "mongodb+srv://Zolere:Yggdrasil99!!@deck-builder.vtmbkox.mongodb.net/?retryWrites=true&w=majority",
    dbName = 'deck-builder'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} Database`)

        const cardsCollection = db.collection('cards')
        app.set('view engine', 'ejs')

        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(cors())

        //Get collection of cards and render it on your index.ejs
        app.get('/', (req, res) => {
            db.collection('cards').find().toArray()
                .then(results => {
                    res.render('index.ejs', { cards: results })
                })
                .catch(error => console.error(error))
        })
        app.post('/cards', (req, res) => {
            // This is what clones the card you clicked from search results and places it in the deck
            cardsCollection.insertOne(req.body)
                .then(result => {
                    res.json(result)
                    // res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        // Update the deck by adding the card that the user had clicked from the Search Results
        // app.put('/cards', (req, res) => {
        //     console.log(req.body)
        //     cardsCollection.findOneAndUpdate(
        //         filter,
        //         update
        //     )
        //     .then(result => {
        //         res.json('Success')
        //     })
        //     .catch(error => console.error(error))
        // })


        //How do I delete a card before having to reload the page?
        app.delete('/delete-single-card', (req, res) => {
            cardsCollection.deleteOne(
                { 
                    '_id': ObjectId(req.body.id)
                    // value: req.body.value
                },
            )
            .then(result => {
                // if (result.deletedCount === 0) {
                //     return res.json('No decks to delete')
                // }
                res.json('')
            })
            .catch(error => console.error(error))
        })

        app.delete('/delete-all-cards', (req, res) => {
            cardsCollection.deleteMany(

            )
            .then(result => {
                // if (result.deletedCount === 0) {
                //     return res.json('No decks to delete')
                // }
                res.json('')
            })
            .catch(error => console.error(error))
        })


        app.listen(port, () => {
            console.log(`The server is running on port ${port}!`)
        })
})
.catch(error => console.error(error))



//Alt + Shift + F

//When you click a card, add its data to mongoDB, then place a copy of its image into the "deck" on the dom

//When you click a card from the deck, remove its data from mongoDB, and then remove it from the deck

//A completed deck must have exactly 60 cards
//Place a counter that shows you how many cards are currently in your deck
//While building the deck, you cannot exceed 60 cards
//You cannot have more than 4 of the same card in a single deck, with the exception being Energy cards


//Zolere / Yggdrasil99!!