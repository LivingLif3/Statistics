const Router = require('express').Router;
const QuizTemplateController = require('../controllers/quizTemplate-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/createQuizTemplate', authMiddleware, QuizTemplateController.create);
router.get('/getQuizes', authMiddleware, QuizTemplateController.getAll);
router.get('/getQuizQuestions/:id', authMiddleware, QuizTemplateController.findTemplateQuestions);
router.delete('/quizeTemplate/:id', authMiddleware, QuizTemplateController.delete);

module.exports = router;
