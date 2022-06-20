const Router = require('express').Router
const QuestionAnswerController = require('../controllers/questionAnswer-controller')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/answer', authMiddleware, QuestionAnswerController.create)
router.post('/teamAnswers', authMiddleware, QuestionAnswerController.getTeamAnswers)
router.post('/userAnswer', authMiddleware, QuestionAnswerController.getUserAnswer)

module.exports = router