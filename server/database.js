const { Low, JSONFile } = require('@commonify/lowdb');
const { Sequelize, Model, DataTypes } = require('sequelize');
// const state = {
//     games: []
// }
// async function init() {
//     const db = new Low(new JSONFile(__dirname + '/games.json'), {})
//     await db.read()
//     if (!db.data) {
//         db.data = { games: [] }
//         await db.write()
//     }
//     return db
// }



// async function write(data) {
//     try {
//         const db = await init()
//         await db.read()
//         data.createdAt = Date.now()
//         // Generate a random id 
//         data.id = Date.now().toString(36)
//         const { games } = db.data
//         games.push(data)
//         state.games = games;
//         await db.write()
//     } catch (e) {
//         console.error("[database] write catch error ", e)
//     }
// }

// async function read() {
//     if (state.games.length === 0) {
//         const db = await init()
//         await db.read()
//         const { games } = db.data
//         state.games = games
//         return games
//     } else {
//         return state.games
//     }
// }




// New 
// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/database.sqlite'
});

// Define User model
class Game extends Model { }
Game.init(
    {
        score: DataTypes.NUMBER,
        isActive: DataTypes.BOOLEAN,
        count: DataTypes.NUMBER,
        points: {
            type: DataTypes.JSON, // Store `points` as a JSON object/array
            allowNull: false,
        },
        player: DataTypes.STRING
    }, { sequelize, modelName: 'game' });

// Sync models with database
sequelize.sync();

async function read() {
    const games = await Game.findAll();
    console.log("get games", games)
}
async function write(game) {
    const games = await Game.create(game);
    console.log("set games", games)
}


const { Op } = require('sequelize'); // Import Sequelize operators for querying

/**
 * Get the top score of all time
 */
async function getTopScoreAllTime() {
    try {
        const topGame = await Game.findOne({
            order: [['score', 'DESC']], // Order by score in descending order
        });
        return topGame ? topGame.toJSON() : null;
    } catch (error) {
        console.error("Error fetching top score of all time:", error);
    }
}

/**
 * Get the top score for today
 */
async function getTopScoreToday() {
    try {
        // Get the start of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Get the end of today
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const topGameToday = await Game.findOne({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay], // Filter by today's date range
                },
            },
            order: [['score', 'DESC']], // Order by score in descending order
        });

        return topGameToday ? topGameToday.toJSON() : null;
    } catch (error) {
        console.error("Error fetching top score today:", error);
    }
}

/**
 * Get the last 5 games added to the database
 */
async function getLast5Games() {
    try {
        const lastGames = await Game.findAll({
            order: [['createdAt', 'DESC']], // Order by `createdAt` in descending order
            limit: 5, // Limit the results to 5
        });
        return lastGames.map(game => game.toJSON());
    } catch (error) {
        console.error("Error fetching last 5 games:", error);
    }
}

module.exports = {
    write,
    read,
    getTopScoreToday,
    getTopScoreAllTime,
    getLast5Games
}
