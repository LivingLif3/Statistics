const QuizTemplateModel = require('../models/quizTemplate-model')
const QuestionTemplateModel = require('../models/questionTemplate-model')

class QuizTemplate {
    async create(title, author, questions) { // questions - array, with objects
        const quiz = await QuizTemplateModel.create({
            title,
            author
        })
        for(let i = 0; i < questions.length; i++) {
            await QuestionTemplateModel.create({
                quiz: quiz._id,
                text: questions[i].text,
                number: i + 1
            })
        }
        const newQuestions = await QuestionTemplateModel.find({quiz: quiz._id})
        newQuestions.forEach(question => {
            quiz.questions.push(question._id)
        })
        quiz.save()
        return quiz
    }
    async getAll(author) {
        const quizes = await QuizTemplateModel.find({author}).populate('questions.question')
        return quizes
    }
    async delete(id) {
        const quiz = await QuizTemplateModel.findById(id)
        if(!quiz) {
            throw new Error("Опрос не найден")
        }
        const deleteResult = await QuizTemplateModel.deleteOne({_id: id})
        return deleteResult
    }
}

module.exports = new QuizTemplate();