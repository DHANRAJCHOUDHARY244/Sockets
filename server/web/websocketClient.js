const WebSocketClient = require("websocket").client;
const getIo = require('../chat/socketServer').getIo;

const Options = {
  method: "SUBSCRIBE",
  params: [
    "!miniTicker@arr@3000ms",
    "btcusdt@aggTrade",
    "btcusdt@depth",
    "btcusdt@kline_1d",
  ],
  id: 1,
};

const OptionsStringify = JSON.stringify(Options);

const client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", (connection) => {
  console.log("WebSocket Client Connected");

  connection.on("error", (error) => {
    console.log("Connection Error: " + error.toString());
  });

  connection.on("close", () => {
    console.log("echo-protocol Connection Closed");
  });

  connection.on("message", (message) => {
    if (message.type === "utf8") {
      const data = JSON.parse(message.utf8Data);
      // console.log(data);
      if (data.stream==='btcusdt@aggTrade') {
        // console.log(data);
        getIo().emit("btcusdt@aggTrade", data);
      }
      else if (data.stream==='!miniTicker@arr@3000ms') {
        // console.log(data);
        getIo().emit("miniTickerArr", data);
      }
      else if (data.stream==='btcusdt@depth') {
        // console.log(data);
        getIo().emit("btcusdt@depth", data);
      }
      else if (data.stream==='btcusdt@kline_1d') {
        // console.log(data);
        getIo().emit("btcusdt@kline_1d", data);
      }
    }
  });

  function sendNumber() {
    if (connection.connected) {
      connection.send(OptionsStringify);
    }
  }
  sendNumber();
});

client.connect("wss://stream.binance.me/stream", Options);

module.exports = client;
