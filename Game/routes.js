const express = require('express')

function playersRouting (dispatch, players) {
  const router = express.Router()

  //post request handler to add a player to the game
  return router.post('/gameplayers', (request, response) => {
    //Get player's id from the request:
    const { player } = request.body

    console.log('post player:', player)

    //Push the id to the players array:
    players.push(player)

    //Send the updated players array to all clients 
    dispatch(players)

    response.status(201).send({
      message:player})
  })
}

function startGameRouting (dispatch,next_turn) {
  const router = express.Router()

  return router.get('/start_game', (request, response) => {
    console.log('Starting game')
    const turn = next_turn()
    console.log('next player:',turn)
    //Send the updated player turn to all clients
    dispatch(turn)
  })
}

function gameRouting (dispatch,next_turn) {
  const router = express.Router()

  return router.get('/game', (request, response) => {
    console.log('Turn played')
    const turn = next_turn()
    console.log('next player:',turn)
    //Send the updated player turn to all clients
    dispatch(turn)
  })
}


module.exports = {
  gameRouting,
  playersRouting,
  startGameRouting
}

