const express = require('express')

module.exports = function routing (dispatch, players) {
  const router = express.Router()

  return router.post('/game', (request, response) => {
    const { player } = request.body

    console.log('player test:', player)

    players.push(player)

    dispatch(players)

    response.status(201).send(player)
  })
}

// const { Router } = require('express')
// const Game = require("./model");

// const router = new Router()

// //Player asign to this game
// router.post("/game", (req, res, next) => {
//   const player = {
//     player_id: req.body.player,
//     isTurn:false
//   };
//   Game.create(player)
//     .then(player => {
//       if (!player) {
//         return res.status(404).send({
//           message: `Cuold not find player`
//         });
//       }
//       return res.status(201).send({message:'player assigned to the game'});
//     })
//     .catch(error => next(error))
//   })


// // Player played his turn
// router.put("/game", (req, res, next) => {
//   Game.findAll()
//     .then(players => {
//      const updatedPlayers = players.forEach(player => {
//         !player.isTurn
//       }); 
//       return Game.update(updatedPlayers).then(players => res.send(players))
      
//     })
//     .catch(error => next(error))
//   })

// //   router.put('/companies/:id', (req, res, next) => {
// //     Company
// //      .findById(req.params.id)
// //      .then(company => {
// //         if (!company) {
// //             return res.status(404).send({
// //                 message: 'Could not find the Company'
// //             })
// //         } else {
// //             return company.update(req.body).then(company => res.send(company))
// //         }
// //      })
// //      .catch(err => next(err)) 
// // })



// // //post route for /game
// // app.post("/game", (req, res) => {
// //   const newGameState = game.map(player => !player.isTurn)
// //   res.send(newGameState)
// // })

// module.exports = router
