// Import
const express = require("express");
const app = express();
const port = 4000;
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require('./users/routes')


// Use
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)


// Home
app.get("/", (req, res) => {
  res.send("hello from home!");
});

// Listen
const server = app.listen(port, () =>
  console.log("Express listens on port " + port + "!")
);
const io = socketIo.listen(server);

// Dispatch
const dispatcher = io => {
  return function dispatch(payload) {
    const action = {
      type: "MESSAGES",
      payload
    };

    io.emit("action", action);
  };
};
const dispatch = dispatcher(io);

// IO
io.on("connection", client => {
  // Connect
  console.log(client.id, "connects.");

  // Send action
  dispatch("hello");

  // Disconnect
  client.on("disconnect", () => console.log(client.id, "disconnects."));
});
