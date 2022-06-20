const {Schema, model} = require('mongoose')

const QuizTemplateSchema = new Schema({
    questions: [
        {
           question: {
               type: Schema.Types.ObjectId,
               ref: 'QuestionTemplate'
           } 
        }
    ],
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = model('QuizTemplate', QuizTemplateSchema)