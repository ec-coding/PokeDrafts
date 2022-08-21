const express = require('express')
const app = express()
const cors = require ('cors');
const PORT = 8000

app.use(cors())
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:cardSearch', (request, response) => {
    const rappersName = request.params.cardSearch.toLowerCase()
    if (rappers[rappersName]) {
        response.json(rappers[rappersName])
    } else {
        response.json(rappers['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})