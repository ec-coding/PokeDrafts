const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const {MongoClient, ObjectId} = require('mongodb')
const connectDB = require('.config/db')
const bodyParser = require('body-parser')
const app = express()
const cors = require ('cors');

// Load Config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

app.use(cors())

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let port = process.env.PORT || 8000; 

//If we don't have this line of code, any of the env files that we attempt to use will not run
require('dotenv').config()

//How do I put this in an env file?
let db,
    dbConnectionStr = "mongodb+srv://Zolere:Yggdrasil99!!@deck-builder.vtmbkox.mongodb.net/?retryWrites=true&w=majority",
    dbName = 'deck-builder'

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Initiate HTML templating engine - ejs
app.set('view engine', 'ejs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/decks', require('./routes/decks'))

// Port Info
const PORT = process.env.PORT || 8000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

//Alt + Shift + F

//When you click a card, add its data to mongoDB, then place a copy of its image into the "deck" on the dom

//When you click a card from the deck, remove its data from mongoDB, and then remove it from the deck

//A completed deck must have exactly 60 cards
//Place a counter that shows you how many cards are currently in your deck
//While building the deck, you cannot exceed 60 cards
//You cannot have more than 4 of the same card in a single deck, with the exception being Energy cards


//Zolere / Yggdrasil99!!

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} Database`)

        const cardsCollection = db.collection('cards')

        // Without this line, we wouldn't know how to handle our views
        // Eventually, our views will be handled by React
        app.set('view engine', 'ejs')

        // These 2 lines allow us to parse things that come out of the body
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