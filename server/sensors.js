
const pigpio = require('pigpio');
const Gpio = pigpio.Gpio;

module.exports = {
  sensors: [],
  terminate() {
    this.sensors.forEach((sensor) => {
      // pigpio.terminate()
      sensor.digitalWrite(0);
    })
  },
  // Creates the gpio pin and setups the logic to event when the sensor is triggered
  init(sensorMap = [], callback = (s) => { }) {
    pigpio.initialize();
    pigpio.configureClock(1, pigpio.CLOCK_PWM);
    console.log("sensor init")
    this.sensors = []
    sensorMap.forEach(s => {
      const sensor = new Gpio(s.gpio, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_UP,
        alert: true
      });
      // Level must be stable for 10 ms before an alert event is emitted.
      sensor.glitchFilter(10000);

      sensor.on('alert', (level, tick) => {
        if (level === 0) {
          // Callback function to emmet from whenver the pin state is broken
          callback(s)
        }
      });
      this.sensors.push(sensor)
    })
  }

}
