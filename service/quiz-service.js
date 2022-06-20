const QuizModel = require("../models/quiz-model")
const QuestionModel = require("../models/question-model")
const moment = require("moment")

class QuizService {
    async create(questions, title, author) { //сделать на сервере new Date, чтобы меньше параметров передавать в функцию
        let date = moment()
        const month = Number(date.month() + 1)
        const day = Number(date.date())
        const year = Number(date.year())
        console.log(day, month, year)
        const quiz = await QuizModel.create({
            title,
            month,
            day,
            year,
            author
        })
        for(let i = 0; i < questions.length; i++) {
            await QuestionModel.create({
                quiz: quiz._id,
                day,
                month,
                year,
                text: questions[i].text,
                number: i + 1
            })
        }
        const quizQuestions = await QuestionModel.find({quiz: quiz._id})
        quizQuestions.forEach(question => {
            quiz.questions.push(question._id)
        })
        quiz.save()
        return quiz
    }
    async findInterval(author, fromYear, toYear, fromMonth, toMonth, fromDay, toDay) {
        const quizes = await QuizModel.find({
            author,
            day: {$gte: fromDay, $lte: toDay},
            month: {$gte: fromMonth, $lte: toMonth},
            year: {$gte: fromYear, $lte: toYear}
        })
        return quizes
    }
    async delete(quizId) {
        const quiz = await QuizModel.findById(quizId)
        if(!quiz) {
            throw new Error("Опрос не найден")
        }
        const deleteResult = await QuizModel.deleteOne({_id: quizId})
        return deleteResult
    }
}

module.exports = new QuizService()