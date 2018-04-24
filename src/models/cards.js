const db = require('../../db')
const MODEL_NAME = 'cards'


function getAll(query = {}) {
    if (query.hasOwnProperty('type')) {
        const { type, ...props } = query
        return db('types')
            .select('types.name', 'cards.img')
            .join('cards_types', 'cards_types.types_id', 'types.id')
            .join('cards', 'cards.id', 'cards_types.cards_id')
            .where("types.name", 'ilike', `%${type}%`)
            .where(props)
    }
    if (query.hasOwnProperty('subtype')) {
        const { subtype, ...props } = query
        return db('subtypes')
            .select('subtypes.name', 'cards.img')
            .join('cards_subtypes', 'cards_subtypes.subtypes_id', 'subtypes.id')
            .join('cards', 'cards.id', 'cards_subtypes.cards_id')
            .where("subtypes.name", 'ilike', `%${subtype}%`)
            .where(props)
    }
    if (query.hasOwnProperty('text')) {
        const { text, ...props } = query
        return db('cards')
            .where('text', 'ilike', `%${query.text}%`)
            .where(props)
    }
    if (query.hasOwnProperty('name')) {
        const { name, ...props } = query
        return db('cards')
            .where('name', 'ilike', `%${query.name}%`)
            .where(props)
    }
    else {
        return db(MODEL_NAME)
    }
}

function create(body){
    // strip away extra info
let cardsWithId

db('types').then(function(type){
  cardsWithId = cards.map(card => {
    const foundTypeId = types.find(type => type.name === card.type)
    return { ...card, type: foundTypeId }
  })
  return db('subtypes')
})
then(function(subtypes){
  // append array with
  cardsWithId = cardsWithId.map(card => {
    const foundSubtypeId = subtypes.find(subtype => subtype.name === card.subtype)
    console.log(foundSubtypeId)
    return { ...card, subtype: foundSubtypeId }
  })

  const clean = cardsWithId.map(card => {
    const { type, subtype, ...props} = card
    return props
  })
  return db('cards').insert(clean).returning('*')
})
.then(cards=>{
  console.log(cards)
})
}

module.exports = {
    getAll,
    create
}