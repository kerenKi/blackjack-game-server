// Import
const express = require("express");
const app = express();
const port = 4000;
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require('./users/routes')
const { playersRouting, gameRouting } = require('./Game/routes')


//Array of players playing the game:
const players = []

let current_turn = 0;
let _turn = 0;

//function that scan the players array and returns the id of the next player
next_turn = () => {
  _turn = current_turn++ % players.length;
  console.log("next turn goes to: " , players[_turn]);
  return players[_turn]
}

// Dispatch the array of players to all clients:
const playersDispatcher = io => {
  return function dispatch(payload) {
    const action = {
      type: "PLAYERS_IN_GAME",
      payload
    };

    io.emit("action", action);
  };
};

// Dispatch the player who plays next to all clients:
const gameDispatcher = io => {
  return function dispatch(payload) {
    const action = {
      type: "NEXT_TURN",
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

const dispatchPlayers = playersDispatcher(io);
const dispatchNextTurn = gameDispatcher(io);


const playersRouter = playersRouting(dispatchPlayers, players)
const gameRouter = gameRouting(dispatchNextTurn, next_turn)


// Use
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)
app.use(playersRouter)
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
  dispatchPlayers(players)

  // Disconnect
  client.on("disconnect", () => console.log(client.id, "disconnects."));
});





