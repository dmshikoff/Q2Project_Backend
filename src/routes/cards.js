const express = require('express')
const cardsController = require('../controllers/cards')


const router = express.Router()

router.get('/', cardsController.getAll)
router.post('/', cardsController.create)

module.exports = router