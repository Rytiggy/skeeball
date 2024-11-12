const { Low, JSONFile } = require('@commonify/lowdb');

async function init() {
    const db = new Low(new JSONFile('games.json'), {})
    await db.read()
    console.log("Init db read", db)
    if (!db.data) {
        db.data = { games: [] }
        await db.write()
    }
    return db
}



async function write(data) {
    try {
        console.log('database write', data)
        const db = await init()
        await db.read()
        console.log("database read data", db)
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
