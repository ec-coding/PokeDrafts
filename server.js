const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require ('cors');
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
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

        app.get('/', (req, res) => {
            db.collection('cards').find().toArray()
                .then(results => {
                    res.render('index.ejs', { cards: results })
                })
                .catch(error => console.error(error))
        })
        app.post('/cards', (req, res) => {
            // let cardID = (req.body.cardID)
            cardsCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        // Update the deck by adding the card that the user had clicked from the Search Results
        app.put('/cards', (req, res) => {
            console.log(req.body)
            cardsCollection.findOneAndUpdate(
                filter,
                update
            )
            .then(result => {
                res.json('Success')
            })
            .catch(error => console.error(error))
        })

        app.delete('/cards', (req, res) => {
            cardsCollection.deleteMany(
    
            )
            .then(result => {
                // if (result.deletedCount === 0) {
                //     return res.json('No decks to delete')
                // }
                res.json('Deleted Decks')
            })
            .catch(error => console.error(error))
        })
        app.listen(process.env.PORT || PORT, () => {
            console.log(`The server is running on port ${PORT}!`)
        })
})
.catch(error => console.error(error))


app.get('/api/:addCard', (request, response) => {
    const addCards = request.params.addCard.toLowerCase()
    if (pokemon[cardImage]) {
        response.json(pokemon[cardImage])
    } else {
        response.json(pokemon['unknown'])
    }
})


//When you click a card, add its data to mongoDB, then place a copy of its image into the "deck" on the dom
//When you click a card from the deck, remove its data from mongoDB, and then remove it from the deck
//A completed deck must have exactly 60 cards
//While building the deck, you cannot exceed 60 cards
//You cannot have more than 4 of the same card in a single deck, with the exception being Energy cards


//Zolere / Yggdrasil99!!