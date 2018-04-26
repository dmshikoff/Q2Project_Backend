const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', userController.createUser)
router.get('/:userId/cards', userController.getAllCards)
router.post('/:userId/cards', userController.createCards)
router.delete('/:userId/cards', userController.removeCards)
router.post('/:userId/decks', userController.createDeck)
router.get('/:userId/decks', userController.getDecks)
router.post('/:userId/decks/:decksId', userController.addCardsToDeck)


module.exports = router
