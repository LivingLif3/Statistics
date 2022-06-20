const QuestionAnswerService = require("../service/questionAnswer-service")

class QuestionAnswerController {
    async create(req, res, next) {
        try {
            const {quiz, answers, user} = req.body
            const answer = await QuestionAnswerService.create(quiz, answers, user)
            res.json(answer)
        } catch(e) {
            next(e)
        }
    }
    async getTeamAnswers(req, res, next) {
        try {
            const {team, quiz} = req.body
            const answers = await QuestionAnswerService.getTeamAnswers(team, quiz)
            res.json(answers)
        } catch(e) {
            next(e)
        }
    }
    async getUserAnswer(req, res, next) {
        try {
            const {user, quiz} = req.body
            const answer = await QuestionAnswerService.getUserAnswer(user, quiz)
            res.json(answer)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new QuestionAnswerController()