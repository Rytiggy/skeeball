
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
    gpio: 27,
    start: 47,
    end: 93,
    score: 100,
    ledGpio: 18,
    stripLength: 235,
    stripType: "sk6812-rgbw"
  },
  {
    gpio: 4,
    start: 94,
    end: 140,
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
  score: [],
  isActive: false,
  getTotalScore() {
    return this.score.reduce((a, b) => a + b.score, 0)
  },
  start(sendMessage) {
    console.log("start called", this.score, this.isActive)
    if (this.isActive)
      return
    this.score = []
    sendMessage({ type: 'start', data: { score: this.getTotalScore() } })

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

      this.score.push(sensor)
      if (this.score.length >= 9) {
        console.log("Game over - Total score", this.getTotalScore(), this.score)
        database.write(this.score)
        this.isActive = false
        sendMessage({ type: 'end', data: { score: this.getTotalScore() } })
        // sensors.terminate()
      }
      // Add the score of this sensor to the total score
      console.log('beam broken', sensor, "score length", this.score.length)
      sendMessage({ type: 'score', data: { sensor, score: this.getTotalScore() } })

      // Show lights for beams ring
      leds.toggleLedSegment(sensor.start, sensor.end, sensor.stripLength, sensor.ledGpio, sensor.stripType)

    }

    sensors.init(sensorMap, beamBroken)
    this.isActive = true
  },
}
