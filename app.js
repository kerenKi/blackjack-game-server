// Import
const express = require("express");
const app = express();
const port = 4000;
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require('./users/routes')
const routing = require('./Game/routes')

//Array of players playing the game:
const players = []

// Dispatch the array of players to all clients:
const dispatcher = io => {
  return function dispatch(payload) {
    const action = {
      type: "PLAYERS_IN_GAME",
      payload
    };

    io.emit("action", action);
  };
};

// Listen
const server = app.listen(port, () =>
  console.log("Express listens on port " + port + "!")
);
const io = socketIo.listen(server);

const dispatch = dispatcher(io);


const gameRouter = routing(dispatch, players)


// Use
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)
app.use(gameRouter)


// Home
app.get("/", (req, res) => {
  res.send("hello from home!");
});


// IO
io.on("connection", client => {
  // Connect
  console.log(client.id, "connects.");

  // Send action
  dispatch(players)

  // Disconnect
  client.on("disconnect", () => console.log(client.id, "disconnects."));
});
