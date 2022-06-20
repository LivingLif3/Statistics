const {Schema, model} = require('mongoose')

const QuestionModel = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = model('Question', QuestionModel)