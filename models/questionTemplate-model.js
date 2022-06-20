const {Schema, model} = require('mongoose')

const QuestionTemplateSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})

module.exports = model('QuestionTemplate', QuestionTemplateSchema)