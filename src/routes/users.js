const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', userController.createUser)
router.post('/:userId/cards', userController.getSomeCards)
router.get('/:userId/cards', userController.getAllCards)
router.post('/:userId/cards', userController.createCards)
router.delete('/:userId/cards', userController.removeCards)
router.post('/:userId/decks', userController.createDeck)
router.get('/:userId/decks', userController.getDecks)
router.get('/:userId/decks/:decksId', userController.getOneDeck)
router.post('/:userId/decks/:decksId', userController.addCardsToDeck)


module.exports = router
