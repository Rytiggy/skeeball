const { Low, JSONFile } = require('@commonify/lowdb');
const state = {
    games: []
}
async function init() {
    const db = new Low(new JSONFile(__dirname + '/games.json'), {})
    await db.read()
    if (!db.data) {
        db.data = { games: [] }
        await db.write()
    }
    return db
}



async function write(data) {
    try {
        const db = await init()
        await db.read()
        data.createdAt = Date.now()
        // Generate a random id 
        data.id = Date.now().toString(36)
        const { games } = db.data
        games.push(data)
        state.games = games;
        await db.write()
    } catch (e) {
        console.error("[database] write catch error ", e)
    }
}

async function read() {
    if (state.games.length === 0) {
        const db = await init()
        await db.read()
        const { games } = db.data
        state.games = games
        return games
    } else {
        return state.games
    }
}



module.exports = {
    write,
    read
}
