const QuizService = require("../service/quiz-service")

class QuizController {
    async create(req, res, next) {
        try {
            const {questions, title} = req.body
            const author = req.user._id
            const quiz = await QuizService.create(questions, title, author)
            res.json(quiz)
        } catch (e) {
            next(e)
        }
    }
    async findInterval(req, res, next) {
        try {
            const {fromMonth, toMonth, fromDay, toDay, fromYear, toYear} = req.body
            const author = req.user._id
            const quizes = await QuizService.findInterval(author, fromYear, toYear, fromMonth, toMonth, fromDay, toDay)
            res.json(quizes)
        } catch (e) {
            next(e)
        }
    }
    async delete(req, res, next) {
        try {
            const quizId = req.params._id
            const deleteResult = await QuizService.delete(quizId)
            res.json(deleteResult)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new QuizController()