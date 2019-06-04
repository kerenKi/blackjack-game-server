const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Home
app.get("/", (req, res) => {
  res.send("hello from express");
});

app.listen(port, () => console.log("Express API listening on port 3000"));
