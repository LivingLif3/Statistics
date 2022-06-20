const {Schema, model} = require('mongoose')

const PasswordSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    activationLink: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = model('Password', PasswordSchema)