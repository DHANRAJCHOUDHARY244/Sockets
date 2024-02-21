// websocketClient.js
var WebSocketClient = require("websocket").client;

const met = {
  method: "SUBSCRIBE",
  params: [
    "!miniTicker@arr@3000ms",
    "btcusdt@aggTrade",
    "btcusdt@depth",
    "btcusdt@kline_1d",
  ],
  id: 1,
};

const a = JSON.stringify(met);

var client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", (connection) => {
  console.log("WebSocket Client Connected");

  connection.on("error",  (error) =>{
    console.log("Connection Error: " + error.toString());
  });

  connection.on("close",  ()=> {
    console.log("echo-protocol Connection Closed");
  });

  function sendNumber() {
    if (connection.connected) {
      connection.send(a);
    }
  }
  sendNumber();
});

client.connect("wss://stream.binance.me/stream", met);

module.exports = client;
