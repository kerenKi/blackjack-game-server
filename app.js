// Imports
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const User = require("./users/model");

// Use
app.use(bodyParser.json());

// Home
app.get("/", (req, res) => {
  res.send("hello from home!");
});

// Create user
app.post("/users", (req, res, next) => {
  const user = {
    name: req.body.name
  };
  User.create(user)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        });
      }
      return res.status(201).send(user);
    })
    .catch(error => next(error));
});

app.listen(port, () => console.log("Express listens on port " + port + "!"));
