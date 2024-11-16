var ws281x = require('@gbkwiatt/node-rpi-ws281x-native');
// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  ws281x.finalize();

  process.nextTick(function () {
    process.exit(0);
  });
});



module.exports = {
  leds: {},
  init(strips) {
    strips.forEach(strip => {
      const { stripType, totalLeds, gpio } = strip
      const channel = ws281x(totalLeds, { gpio: gpio, invert: false, brightness: 255, stripType });
      this.leds[stripType] = channel;
    })
  },
  toggleLedSegment(startLed, endLed, totalLeds, gpio, stripType = 'ws2812') {
    // const channel = ws281x(totalLeds, { gpio: gpio, invert: false, brightness: 255, stripType });
    const channel = this.leds[stripType]
    channel.array = setColor(channel.array, 0, 0, 255, startLed, startLed + 47)
    ws281x.render();
    // setTimeout(() => {
    //   ws281x.reset();
    // }, 1000)
  }
}

function setColor(leds, r, g, b, start = 0, end = 10) {
  for (let i = start; i < end; i++) {
    leds[i] = rgb2Int(r, g, b);
  }
  return leds;
}

// helpers for color effects
// rainbow-colors, taken from http://goo.gl/Cs3H0v
// let offset = 0;
// let interval = setInterval(function () {
//   for (let i = startLed; i < 3 * endLed; i++) {
//     channel.array[i] = colorwheel((offset + i) % 256);
//   }

//   offset = (offset + 1) % 256;
//   ws281x.render();
// }, 10);
function colorwheel(pos) {
  pos = 255 - pos;

  if (pos < 85) {
    return rgb2Int(255 - pos * 3, 0, pos * 3);
  } else if (pos < 170) {
    pos -= 85;
    return rgb2Int(0, pos * 3, 255 - pos * 3);
  } else {
    pos -= 170;
    return rgb2Int(pos * 3, 255 - pos * 3, 0);
  }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

function rgbw2Int(r, g, b, w) {
  return (
    ((w & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
  );
}