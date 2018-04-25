const cardsModel = require('../models/cards')


function getAll(req, res, next) {
    cardsModel.getAll(req.query)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(next)
}

function create(req, res, next) {
    
    cardsModel.create(req.body, req.params.userId)
        .then(data => {
            res.status(200).send({data})
        })
        .catch(next)
}



module.exports = {
    getAll,
    create
}