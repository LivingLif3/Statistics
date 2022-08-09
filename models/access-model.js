const {Schema, model} = require('mongoose')

const AccessSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    templates: {type: Array, required: true}
})

module.exports = model('AccessSchema', AccessSchema)