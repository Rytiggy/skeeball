
const sensors = require('./sensors.js')
// const leds = require('./leds.js')
const moter = require('./moters.js')
const database = require('./database.js')

// build the sensor map: maps the break beam gpio pin to the strip segment
const sensorMap = [
  {
    gpio: 17,
    score: 100,
  },
  {
    gpio: 4,
    score: 100,
  },
  {
    gpio: 27,
    score: 50,
  },
  {
    gpio: 13,
    score: 40,
  },
  {
    gpio: 6,
    score: 30,
  },

  {
    gpio: 22,
    score: 20,
  },
  {
    gpio: 5,
    score: 10,
  },
  {
    gpio: 21,
    score: 0,
  },
]

// const ledStrips = [
//   { count: 234, gpio: 18, invert: false, brightness: 155, stripType: 'sk6812-rgbw' },
//   { count: 94, gpio: 12, invert: false, brightness: 155, stripType: 'ws2812' }
// ]
// leds.init(ledStrips)

module.exports = {
  points: [],
  balls: [],
  isActive: false,
  player: "Player",
  getTotalScore() {
  },
  getGame() {
    return {
      score: this.points.reduce((a, b) => a + b.score, 0),
      isActive: this.isActive,
      count: this.balls.length,
      points: this.points,
      player: this.player
    }
  },
  start(sendMessage, player = "Player") {
    this.player = player

    // check early if game is already active and return if active
    if (this.isActive)
      return
    this.isActive = true
    this.points = []
    this.balls = []
    sendMessage({ type: 'start', data: { game: this.getGame() } })

    try {
      // Open the door to let the ball fall
      moter.setPostion(1000)
      // Wait a few seconds for the balls the fall down
      setTimeout(() => {
        moter.setPostion(2000)
      }, 5000)
    } catch (e) {
      console.error("error", e)
    }


    const beamBroken = (sensor) => {
      if (!this.isActive)
        return


      if (sensor.score !== 0) {
        this.points.push(sensor)
      } else {
        this.balls.push(sensor)
      }

      sendMessage({ type: 'score', data: { game: this.getGame() } })

      if (this.balls.length >= 9 || this.points.length >= 9) {
        database.write(this.getGame())
        this.isActive = false
        sendMessage({ type: 'end', data: { game: this.getGame() } })
      }
    }

    sensors.init(sensorMap, beamBroken)
    // leds.init()
  },
}
