
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
module.exports = {
  points: [],
  isActive: false,
  getTotalScore() {
    return this.points.reduce((a, b) => a + b.score, 0)
  },
  getGame() {
    return {
      score: this.getTotalScore(),
      isActive: this.isActive,
      count: this.points.length,
      points: this.points
    }
  },
  start(sendMessage) {
    if (this.isActive)
      return
    this.isActive = true
    this.points = []
    sendMessage({ type: 'start', data: { game: this.getGame() } })

    try {
      // Open the door to let the ball fall
      moter.setPostion(1000)
      // Wait a few seconds for the balls the fall down
      setTimeout(() => {
        moter.setPostion(1700)
      }, 5000)
      // This other timeout is so it doesn't get in the vibration state 
      setTimeout(() => {
        moter.setPostion(2000)
      }, 10000)
    } catch (e) {
      console.error("error", e)
    }


    const beamBroken = (sensor) => {
      if (!this.isActive)
        return

      this.points.push(sensor)
      sendMessage({ type: 'score', data: { game: this.getGame() } })

      if (this.points.length >= 9) {
        database.write(this.points)
        this.isActive = false
        sendMessage({ type: 'end', data: { game: this.getGame() } })
      }

      // Show lights for beams ring
      // leds.toggleLedSegment(sensor.start, sensor.end, sensor.stripLength, sensor.ledGpio, sensor.stripType)

    }

    sensors.init(sensorMap, beamBroken)
    // const ledStrips = [
    //   {
    //     stripType: "sk6812-rgbw",
    //     totalLeds: 235,
    //     gpio: 18,
    //   },
    //   {
    //     stripType: "ws2812",
    //     totalLeds: 94,
    //     gpio: 12,
    //   }
    // ]
    // leds.init(ledStrips)
  },
}
