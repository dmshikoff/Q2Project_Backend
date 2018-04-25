const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

router.post('/', userController.createUser)
router.get('/:userId/cards', userController.getAllCards)
router.post('/:userId/cards', userController.createCards)


module.exports = router
