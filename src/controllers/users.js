const userModel = require('../models/users')
const cardsModel = require('../models/cards')


//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function createUser(req, res, next) {
  if (!req.body.username) {
    return next({ status: 400, message: 'Bad username' })
  }

  if (!req.body.password) {
    return next({ status: 400, message: 'Bad username' })
  }

  userModel.create(req.body.username, req.body.password)
    .then(function (data) {
      return res.status(201).send({ data })
    })
    .catch(next)
}

function getAllCards(req, res, next) {
  cardsModel.getAll(req.query)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(next)
}

function createCards(req, res, next) {

  cardsModel.create(req.body, req.params.userId)
    .then(data => {
      res.status(200).send({ data })
    })
    .catch(next)
}

function removeCards(req, res, next) {

  cardsModel.remove(req.body, req.params.userId)
    .then(data => {
      res.status(200).send({data})
    })
    .catch(next)
}

function createDeck(req, res, next) {

  userModel.createDeck(req.body.name, req.params.userId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getDecks(req, res, next){

  userModel.getDecks(req.params.userId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getOneDeck(req, res, next){

  userModel.getOneDeck(req.params.userId, req.params.decksId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function addCardsToDeck(req, res, next) {

  userModel.addCardsToDeck(req.body, req.params.deckId, req.params.userId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getSomeCards(req, res, next){

  userModel.getSomeCards(req.body, req.params.userId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllCardsFromDeck(req, res, next){
  userModel.getAllCardsFromDeck(req.params.userId, req.params.decksId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getOneUser(req, res, next){
  userModel.getOneUser(req.params.userId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  createUser,
  getAllCards,
  createCards,
  removeCards,
  createDeck,
  getDecks,
  getOneDeck,
  getSomeCards,
  addCardsToDeck,
  getAllCardsFromDeck,
  getOneUser
}