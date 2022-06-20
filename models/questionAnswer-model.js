const {Schema, model} = require('mongoose')

const QuestionAnswerModel = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    avarageAnswer: {
        type: Number,
        required: true
    }
})

module.exports = model('QuestionAnswer', QuestionAnswerModel)