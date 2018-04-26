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
    if (query.hasOwnProperty('black')) {
        return db('cards')
            .where(query)
    }
    if (query.hasOwnProperty('red')) {
        return db('cards')
            .where(query)
    }
    if (query.hasOwnProperty('green')) {
        return db('cards')
            .where(query)
    }
    if (query.hasOwnProperty('white')) {
        return db('cards')
            .where(query)
    }
    if (query.hasOwnProperty('blue')) {
        return db('cards')
            .where(query)
    }
    if (query.hasOwnProperty('colorless')) {
        return db('cards')
            .where(query)
    }
    else {
        return db(MODEL_NAME)
    }
}

function create(cards, userId) {
    // strip away extra info
    let cardsWithId
    let myDBCards

    return db('types').then(function (types) {
        cardsWithId = cards.map(card => {
            let idArray = card.type.map(cardType => {
                const foundTypeId = types.find(type => type.name === cardType)
                return foundTypeId.id
            })
            return { ...card, type: idArray }
        })
        return db('subtypes')
    })
        .then(function (subtypes) {
            // append array with
            cardsWithId = cardsWithId.map(card => {
                if (card.subtype.length !== 0) {
                    let idArray = card.subtype.map(cardSubtype => {

                        let foundSubtypeId = subtypes.find(subtype => subtype.name === cardSubtype)
                        return foundSubtypeId.id
                    })
                    return { ...card, subtype: idArray }
                }
                else {
                    return card
                }
            })
            const clean = cardsWithId.map(card => {
                const { type, subtype, ...props } = card
                return props
            })
            return db('cards').insert(clean).returning('*')
        })
        .then(dbcards => {
            myDBCards = dbcards
            const clean = cardsWithId.map(card => {
                const { type, multiverseId, ...props } = card

                return { type, multiverseId }
            })
            const arrayOfCardsWithTypeAndCardId = clean.map(typeObj => {
                const cardWithMatchingMultId = dbcards.find(card => card.multiverseId === typeObj.multiverseId)

                const cardWithTypeArray = { type: typeObj.type, id: cardWithMatchingMultId.id }

                const cardWithTypeAndCardId = cardWithTypeArray.type.map(type => {
                    const newObj = { types_id: type, cards_id: cardWithTypeArray.id }
                    return newObj
                })
                return cardWithTypeAndCardId
            })
            return db('cards_types').insert(arrayOfCardsWithTypeAndCardId[0]).returning('*')
        })
        .then(cardsTypes => {
            let clean = cardsWithId.filter(ele => {
                return ele.subtype ? true : false
            })
            let newClean = clean.map(card => {
                const { subtype, multiverseId, ...props } = card

                return { subtype, multiverseId }
            })
            const arrayOfCardsWithSubtypeAndCardId = newClean.map(subtypeObj => {
                const cardWithMatchingMultId = myDBCards.find(card => card.multiverseId === subtypeObj.multiverseId)

                const cardWithSubtypeArray = { subtype: subtypeObj.subtype, id: cardWithMatchingMultId.id }

                const cardWithSubtypeAndCardId = cardWithSubtypeArray.subtype.map(subtype => {
                    const newObj = { subtypes_id: subtype, cards_id: cardWithSubtypeArray.id }
                    return newObj
                })
                return cardWithSubtypeAndCardId
            })
            return db('cards_subtypes').insert(arrayOfCardsWithSubtypeAndCardId[0]).returning('*')
        })
        .then(itdoesntmatter => {
            const userCards = myDBCards.map(card => {
                const obj = { cards_id: card.id, users_id: userId }
                return obj
            })
            return db('users_cards').insert(userCards).returning('*')
        })
}

function remove(cards, userId) {

    let myDBCards = cards
    
    cardId = cards.map( card => {
        return { id: card.id }
    })
    let removedCardsFromCardType;
    let removedCardsFromCardSubtype;
    let removedCardsFromUserCards;
    let removedCardsFromCards;

    return Promise.all(cardId.map(idObj => {
        return (
            db('cards_types')
            .del()
            .where({ cards_id: idObj.id })
            .returning('*')
          )
    }))
    .then(data => {
        return Promise.all(cardId.map(idObj => {
            return (
                db('cards_subtypes')
                .del()
                .where({ cards_id: idObj.id })
                .returning('*')
              )
        }))
    })
    .then(data => {
        return Promise.all(cardId.map(idObj => {
            return (
                db('cards_decks')
                .del()
                .where({ cards_id: idObj.id })
                .returning('*')
              )
        }))
    })
    .then(data => {
        return Promise.all(cardId.map(idObj => {
            return (
                db('users_cards')
                .del()
                .where({ cards_id: idObj.id })
                .returning('*')
              )
        }))
    })
    .then(data => {
        
        return Promise.all(cardId.map(idObj => {
            return (
                db('cards')
                .del()
                .where({ id: idObj.id })
                .returning('*')
              )
        }))
    })
}


module.exports = {
    getAll,
    create,
    remove
}