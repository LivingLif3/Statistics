const Router = require('express').Router;
const QuizController = require('../controllers/quiz-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const accessMiddleware = require('../middlewares/available-middleware');

const router = new Router();

router.post('/quiz', authMiddleware, accessMiddleware, QuizController.create);
router.post('/quizes', authMiddleware, QuizController.findInterval);
router.get('/quizes', authMiddleware, QuizController.getQuizesForMe);
router.get('/quizeQuestions/:quiz', authMiddleware, QuizController.getQuizQuestions);
router.delete('/quiz', authMiddleware, QuizController.delete);

module.exports = router;
