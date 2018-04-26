const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', userController.createUser)
router.get('/:userId', userController.getOneUser)
router.post('/:userId/someCards', userController.getSomeCards)
router.post('/:userId/cards', userController.createCards)
router.get('/:userId/cards', userController.getAllCards)
router.delete('/:userId/cards', userController.removeCards)
router.post('/:userId/decks', userController.createDeck)
router.get('/:userId/decks', userController.getDecks)
router.get('/:userId/decks/:decksId', userController.getOneDeck)
router.get('/:userId/decks/:decksId/cards', userController.getAllCardsFromDeck)
router.post('/:userId/decks/:decksId/cards', userController.addCardsToDeck)


module.exports = router
