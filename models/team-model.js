const {Schema, model} = require('mongoose')

const TeamSchema = new Schema({
    trainer: {type: Schema.Types.ObjectId, required: true},
    players: {type: Array},
    name: {type: String, required: true}
})

module.exports = model('Team', TeamSchema)