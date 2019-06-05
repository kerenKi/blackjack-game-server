// Import
const express = require("express");
const app = express();
const port = 4000;
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require('./users/routes')
const { playersRouting, gameRouting, startGameRouting , gameOverRouting} = require('./Game/routes')


//Array of players playing the game:
let players = []

let current_turn = 0;
let _turn = 0;

//function that scan the players array and returns the id of the next player
next_turn = () => {
  _turn = current_turn++ % players.length;
  return players[_turn]
}

//function that resets the players array to be empty again
resetPlayers = () => {
  players.length = 0
  return players
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

// Dispatch the player who start the game to all clients:
const startGameDispatcher = io => {
  return function dispatch(payload) {
    const action = {
      type: "STARTING_PLAYER",
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

// Dispatch GAME_OVER action to all clients:
const gameOverDispatcher = io => {
  return function dispatch(payload) {
    const action = {
      type: "GAME_OVER",
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

//Dispatchers
const dispatchPlayers = playersDispatcher(io);
const dispatchNextTurn = gameDispatcher(io);
const dispatchStartGame = startGameDispatcher(io);
const dispatchGameOver = gameOverDispatcher(io);

//Routers
const playersRouter = playersRouting(dispatchPlayers, players)
const gameRouter = gameRouting(dispatchNextTurn, next_turn)
const startGameRouter = startGameRouting(dispatchStartGame, next_turn)
const gameOverRouter = gameOverRouting(dispatchGameOver, resetPlayers)


// Use
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)
app.use(playersRouter)
app.use(gameRouter)
app.use(startGameRouter)
app.use(gameOverRouter)


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


