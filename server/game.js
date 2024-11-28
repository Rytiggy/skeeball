
const sensors = require('./sensors.js')
const leds = require('./leds.js')
const moter = require('./moters.js')
const database = require('./database.js')

// build the sensor map: maps the break beam gpio pin to the strip segment
const sensorMap = [
  {
    gpio: 17,
    start: 0,
    end: 46,
    score: 100,
    ledGpio: 18,
    stripLength: 235,
    stripType: "sk6812-rgbw"
  },
  {
    gpio: 4,
    start: 47,
    end: 93,
    score: 100,
    ledGpio: 18,
    stripLength: 235,
    stripType: "sk6812-rgbw"
  },
  {
    gpio: 27,
    start: 94, // update
    end: 140, // update
    score: 50,
    ledGpio: 18,
    stripLength: 235,
    stripType: "sk6812-rgbw"
  },
  {
    gpio: 13,
    start: 141,
    end: 187,
    score: 40,
    ledGpio: 18,
    stripLength: 235,
    stripType: "sk6812-rgbw"
  },
  {
    gpio: 6,
    start: 188,
    end: 234,
    score: 30,
    ledGpio: 18,
    stripLength: 235,
    stripType: "sk6812-rgbw"

  },

  {
    gpio: 22,//
    start: 0,
    end: 46,
    score: 20,
    ledGpio: 12,
    stripLength: 94,
    stripType: "ws2812"

  },
  {
    gpio: 5,
    start: 47,
    end: 93,
    score: 10,
    ledGpio: 12,
    stripLength: 94,
    stripType: "ws2812"
  },
]

const ledStrips = [
  { count: 234, gpio: 18, invert: false, brightness: 255, stripType: 'sk6812-rgbw' },
  { count: 94, gpio: 12, invert: false, brightness: 255, stripType: 'ws2812' }
]
// leds.init(ledStrips)

module.exports = {
  points: [],
  isActive: false,
  player: "Player",
  getTotalScore() {
  },
  getGame() {
    return {
      score: this.points.reduce((a, b) => a + b.score, 0),
      isActive: this.isActive,
      count: this.points.length,
      points: this.points,
      player: this.player
    }
  },
  start(sendMessage, player = "Player") {
    // Fail out early if game is already active
    if (this.isActive)
      return
    console.log("Active Player", player)
    this.player = player
    this.isActive = true
    this.points = []
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
      console.log("beam broken", sensor.stripType, sensor.start, sensor.end)
      // leds.toggleLedSegment(sensor.stripType, sensor.start, sensor.end)

      this.points.push(sensor)
      sendMessage({ type: 'score', data: { game: this.getGame() } })

      if (this.points.length >= 9) {
        database.write(this.getGame())
        this.isActive = false
        sendMessage({ type: 'end', data: { game: this.getGame() } })
      }
    }

    sensors.init(sensorMap, beamBroken)
  },
}
