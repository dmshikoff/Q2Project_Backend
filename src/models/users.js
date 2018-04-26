const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getOneByUserName(username){
  return (
    db('users')
    .where({ username })
    .first()
  )
}

//////////////////////////////////////////////////////////////////////////////
// Create a user
//
// 1. Check to see if user already exists
//   a. if so, return a 400 with appropriate error message
// 2. Hash password
// 3. Insert record into database
// 4. strip hashed password away from object
// 5. "return/continue" promise
//////////////////////////////////////////////////////////////////////////////

function create(username, password){

  // check to see of user already exists
  return getOneByUserName(username)
  .then(function(data){
    // if user already exists, return 400
    if(data) throw { status: 400, message:'User already exists'}

    // hash password
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){

    // 3. Insert record into database
    return (
      db('users')
      .insert({ username, password: hashedPassword })
      .returning('*')
    )
  })
  .then(function([ data ]){
    // 4. strip hashed password away from object
    delete data.password
    // 5. "return/continue" promise
    return data
  })
}

function createDeck(body, userId){
  const newObj = {name: body, users_id: userId}
  return db('decks').insert(newObj).returning('*')
}

function getDecks(userId){
  return db('decks').where({ users_id : userId}).returning('*')
}

function getOneDeck(userId, deckId){
  return db('decks').where({ users_id: userId, id: deckId }).returning('*')
}

function addCardsToDeck(body, userId, deckId){
  const cardIdArray = body.map(ele => {
    let cardId = { decks_id: Number(deckId), cards_id : ele.id }
    return cardId
  })
  
  return db('cards_decks').insert(cardIdArray).returning('*')
}

function getSomeCards(body, userId){
  const cardsIdArray = body.map(ele => {
   const cardId =  ele.cards_id
   return cardId
  })
  return Promise.all(cardsIdArray.map(ele => {
    return db('cards').where({id : ele}).returning('*')
  }))
}

function getAllCardsFromDeck(userId, deckId){

  return db('decks').where({ id: deckId, users_id: userId}).returning('*')

  .then(response => {
    return db('cards_decks').where({ decks_id: response[0].id }).returning('*')
  })
  .then(response => {
    let cardIdArray = response.map(obj => {
      return obj.cards_id
    })
    return Promise.all(cardIdArray.map(ele => {
      return db('cards').where({ id: ele}).returning('*')
    }))
  })
  .then(response => {
    const cards = response.map(array => {
      return array[0]
    })
    return cards
  })
}



module.exports = {
  getOneByUserName,
  create,
  createDeck,
  getDecks,
  getOneDeck,
  getSomeCards,
  addCardsToDeck,
  getAllCardsFromDeck
}
