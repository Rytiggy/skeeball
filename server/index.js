const game = require('./game.js')
const database = require('./database.js')
const express = require('express')
const WebSocket = require('ws');
var cors = require('cors');

const app = express()
app.use(cors())
const port = 3000
const wss = new WebSocket.Server({ port: 80 });



wss.on('connection', (ws) => {
    console.log(ws)
    // Code to handle new WebSocket connections
});

wss.on('message', (message) => {
    // Code to handle incoming messages
});

function sendMessage(data) {
    const stringData = JSON.stringify(data)
    wss.clients.forEach((client) => {
        client.send(stringData);
    });
}


app.post('/start-game', (req, res) => {
    res.send({ data: "Game started" })
    game.start(sendMessage)
})

app.get('/games', async (req, res) => {
    const games = await database.read()
    res.send(games)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})

