const game = require('./game.js')
const database = require('./database.js')
const express = require('express')
const WebSocket = require('ws');
var cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000
const wss = new WebSocket.Server({ port: 80 });



wss.on('connection', (ws) => {
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
    console.log("Start Game", req.body)
    game.start(sendMessage, req.body?.data?.player)

    res.send({ message: "Game started" })
})

app.get('/high-score', async (req, res) => {
    const allTimeHighscore = await database.getTopScoreAllTime()
    const highscoreToday = await database.getTopScoreToday()

    res.send({ ever: allTimeHighscore?.score ? allTimeHighscore.score : 0, today: highscoreToday?.score ? highscoreToday.score : 0 })
})

app.get('/last-5-games', async (req, res) => {
    const lastFiveGames = await database.getLast5Games()
    res.send({ lastFiveGames })
})

app.listen(port, () => {
    console.log(`Skeeball started on port ${port}`)
})

