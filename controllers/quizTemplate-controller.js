const quizTemplateService = require('../service/quizTemplate-service')

class QuizTemplateController {
    async create(req, res, next) {
        try {
            const {title, author, questions} = req.body
            const quiz = await quizTemplateService.create(title, author, questions)
            res.json(quiz)
        } catch (e) {
            next(e)
        }
    }
    async getAll(req, res, next) {
        try {
            const author = req.user._id
            const quizes = await quizTemplateService.getAll(author)
            res.json(quizes)
        } catch (e) {
            next(e)
        }
    }
    async delete(req, res, next) {
        try {
            const quizId = req.params.id
            const deleteResult = await quizTemplateService.delete(quizId)
            res.json(deleteResult)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new QuizTemplateController()