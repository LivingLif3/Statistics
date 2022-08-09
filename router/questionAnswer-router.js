const Router = require('express').Router;
const QuestionAnswerController = require('../controllers/questionAnswer-controller');
const answerMiddleware = require('../middlewares/answer-middleware');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/answer', authMiddleware, answerMiddleware, QuestionAnswerController.create);
router.post(
  '/answerCustom',
  authMiddleware,
  answerMiddleware,
  QuestionAnswerController.createCustomAnswer,
);
router.post('/teamAnswers', authMiddleware, QuestionAnswerController.getTeamAnswers);
router.post('/userAnswer', authMiddleware, QuestionAnswerController.getUserAnswer);
router.post('/findInterval', authMiddleware, QuestionAnswerController.findInterval);
router.post('/findCustomInterval', authMiddleware, QuestionAnswerController.findCustomInterval);

module.exports = router;
