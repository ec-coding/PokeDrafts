const express = require('express')
const app = express()
const cors = require ('cors');
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

app.use(cors())
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:addCard', (request, response) => {
    const addCards = request.params.addCard.toLowerCase()
    if (pokemon[cardImage]) {
        response.json(pokemon[cardImage])
    } else {
        response.json(pokemon['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})


//When you click a card, add its data to mongoDB, then place it into the "deck" on the dom
//When you click a card from the deck, remove its data from mongoDB, and then remove it from the deck
//A completed deck must have exactly 60 cards
//While building the deck, you cannot exceed 60 cards
//You cannot have more than 4 of the same card in a single deck, with the exception being Energy cards