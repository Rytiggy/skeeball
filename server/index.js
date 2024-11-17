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
    res.send({ message: "Game started" })
    game.start(sendMessage)
})

app.get('/high-score', async (req, res) => {
    const games = await database.read()
    console.log(games)
    const highscoreToday = Math.max(...games?.filter(game => isInToday(new Date(game?.createdAt))).map(o => o?.score))
    const allTimeHighscore = Math.max(...games?.map(o => o?.score))
    res.send({ ever: allTimeHighscore, today: highscoreToday })

})

app.listen(port, () => {
    console.log(`Skeeball started on port ${port}`)
})


function isInToday(inputDate) {
    if (!inputDate)
        return false

    var today = new Date();
    if (today.setHours(0, 0, 0, 0) == inputDate.setHours(0, 0, 0, 0)) {
        return true;
    }
    else { return false; }
}