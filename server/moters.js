

const Gpio = require('pigpio').Gpio;
const moter = new Gpio(10, { mode: Gpio.OUTPUT });

module.exports = {
  setPostion(postion = 1000) {

    moter.servoWrite(postion);
  }
}