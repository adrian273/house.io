/***
 * Adrian Verdugo ( アドリアン　)
 * @github adrian273
 * @since 11/18/2020
 * @file server/index.js
 */

// -----------------------------------------------------------------------------------------------------
const express = require("express");
// Create Server here
const app = express();
// your port (for example 8000 or other)
const port = 4000; // your custom port
// Create instance of johnny five (robot library used in this project) 
const five = require("johnny-five");
// -----------------------------------------------------------------------------------------------------
// this library help you connect to the nodemcu by wifi
var EtherPortClient = require("etherport-client").EtherPortClient;
// update host to the IP address for your ESP board
var board = new five.Board({
  port: new EtherPortClient({
    host: "192.168.18.237", // your ip (it's generated on StandarFirmataWifi) (view Serial Monitor for more)
    port: 3030 // default port
  }),
  timeout: 1e5,
  repl: false
});
// ------------------------------------------------------------------------------------------------------
// Server Created on port 4000
const server = app.listen(`${port}`, function () {
  console.log(`Server started on port ${port}`);
});
// ------------------------------------------------------------------------------------------------------
const io = require("socket.io")(server);
// ------------------------------------------------------------------------------------------------------
io.on("connection", socket => {
  
  /**
    * @param {json} data - LED status and Led ID.
    * @todo bedroom led
  */
  socket.on('ledOn', data => {
    const bedRoomLed = new five.Led(2); // create instance of led
    console.log(data)
    if (data.on == "0" && data.id == "bedroom") {
      bedRoomLed.off()
    } else {
      bedRoomLed.on();
    }
  });
  
  /**
   * @param {json} data - LED status and Led id.
   * @todo bathroom led
   */
  socket.on('bathLedOn', data => {
    const bathRoomLed = new five.Led(14); // create intance of led
    console.log(data)
    if (data.on == "0" && data.id == "bathroom") {
      bathRoomLed.off()
    } else {
      bathRoomLed.on();
    }
  });
});

/**
 * @requires {johnny five - socket.io} - NodeMCU will start here when the terminal says "ready"! 
 */
board.on("ready", function () {
  console.log('ready')
  // ------------------------------------------------------------------------------------
  // ---- Buttons
  bedroomDoor = new five.Button({
    pin: 5,
  });
  bathroomDoor = new five.Button(4);
  // Button Event API
  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  bedroomDoor.on("hold", function () {
    console.log("hold");
    io.emit('closeBedroomDoor', 2);
  });

  // "up" the button is released
  bedroomDoor.on("up", function () {
    console.log("up");
    io.emit('openBedroomDoor', 1);
  });

  // "up" the button is released
  bathroomDoor.on("up", function () {
    console.log("up");
    io.emit('openBathroomDoor', 1);
  });

  bathroomDoor.on("hold", function () {
    console.log("hold");
    io.emit('closeBathroomDoor', 2);
  });

  // ------------------------------------------------------------------------------------
  const thermometer = new five.Thermometer({
    controller: "LM35", //   thermometer controller name used
    pin: "A0", // analog signal
  });

  
  /** @type {change} - this function sends data constantly to the user interface when it temperature changes */
  thermometer.on("change", () => {
    const { celsius, fahrenheit, kelvin } = thermometer;
    console.log("Thermometer");
    console.log("  celsius      : ", celsius);
    console.log("  fahrenheit   : ", fahrenheit);
    console.log("  kelvin       : ", kelvin);
    console.log("--------------------------------------");
    io.emit('user-connected', { 'celsius': celsius, 'fahrenheit': fahrenheit, 'kelvin': kelvin });
  });

})
