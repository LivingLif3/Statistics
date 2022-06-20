const {Schema, model} = require('mongoose')

const QuizModel = new Schema({
    questions:{
        type: Array,
        required: true
    },
    title: {
        type: String,
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
        required:true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
    answered: {
        type: Array
    }
})

module.exports = model('Quiz', QuizModel)