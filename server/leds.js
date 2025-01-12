var ws281x = require('@gbkwiatt/node-rpi-ws281x-native');
module.exports = {
  scoreLedEffect(segment) {

    fetch("http://192.168.3.183/json/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seg: [
          {
            id: segment.id,
            on: true
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => console.log("Success:", data))
      .catch(error => console.error("Error:", error));



    setTimeout(() => {
      this.toggleSegments([{
        id: segment.id,
        on: false
      }]);

    }, 750)
  },
  toggleSegments(segments) {
    fetch("http://192.168.3.183/json/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seg: segments
      })
    })
      .then(response => response.json())
      .then(data => console.log("Success:", data))
      .catch(error => console.error("Error:", error));
  }
  // init(strips) {

  // const options = {
  //   dma: 10,
  //   freq: 800000,
  //   gpio: 18,
  //   invert: false,
  //   brightness: 255,
  //   stripType: ws281x.stripType.SK6812W
  // };
  // const channel = ws281x(234, options);
  // ws281x.reset();

  // let offset = 0;

  // for (let i = 0; i < 3 * 234; i++) {
  //   channel.array[i] = colorwheel((offset + i) % 256);
  // }

  // offset = (offset + 1) % 256;
  // ws281x.render();


}

// {
//   id: segment.id,
//   on: false
// }




// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;

  if (pos < 85) {
    return rgbw2Int(255 - pos * 3, 0, pos * 3);
  } else if (pos < 170) {
    pos -= 85;
    return rgbw2Int(0, pos * 3, 255 - pos * 3);
  } else {
    pos -= 170;
    return rgbw2Int(pos * 3, 255 - pos * 3, 0);
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