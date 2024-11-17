const { Low, JSONFile } = require('@commonify/lowdb');

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
        await db.write()
    } catch (e) {
        console.error("[database] write catch error ", e)
    }
}

async function read() {
    const db = await init()
    await db.read()
    const { games } = db.data
    return games
}



module.exports = {
    write,
    read
}
