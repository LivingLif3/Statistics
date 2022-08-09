const QuizCollectionService = require("../service/quizCollection-service")

class QuizCollectionController {
    async getAll(req, res, next) {
        try {
            const author = req.user.id
            const quizCollections = await QuizCollectionService.getAll(author)
            res.json(quizCollections)
        } catch(e) {
            next(e)
        }
    }
    async findInterval(req, res, next) {
        try {
            const author = req.user.id
            const {fromMonth, toMonth, fromDay, toDay, fromYear, toYear} = req.body
            const quizCollections = await QuizCollectionService.findInterval(author, fromMonth, toMonth, fromDay, toDay, fromYear, toYear)
            res.json(quizCollections)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new QuizCollectionController()