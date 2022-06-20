const Router = require('express').Router
const QuizController = require('../controllers/quiz-controller')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/quiz', authMiddleware, QuizController.create)
router.post('/quizes', authMiddleware, QuizController.findInterval)
router.delete('/quiz', authMiddleware, QuizController.delete)

module.exports = router