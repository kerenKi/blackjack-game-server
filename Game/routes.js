const express = require('express')

module.exports = function routing (dispatch, players) {
  const router = express.Router()

  //post request handler to add a player to the game
  return router.post('/game', (request, response) => {
    //Get player's id from the request:
    const { player } = request.body

    console.log('post player:', player)

    //Push the id to the players array:
    players.push(player)

    //Send the updated players array to all clients 
    dispatch(players)

    response.sendStatus(201).send(player)
  })
}

