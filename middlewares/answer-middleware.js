const QuizModel = require('../models/quiz-model');

module.exports = async (req, res, next) => {
  let quizId = req.body.quiz;
  let quiz = await QuizModel.findById(quizId);
  if (quiz.end) {
    return res.json('Время действия опроса истекло');
  }
  return next();
};
