const QuizService = require('../service/quiz-service');

class QuizController {
  async create(req, res, next) {
    try {
      const { quizId, users, repeat } = req.body;
      const author = req.user.id;
      const quizes = await QuizService.create(quizId, author, users, repeat);
      res.json(quizes);
    } catch (e) {
      next(e);
    }
  }
  async findInterval(req, res, next) {
    try {
      const { template, fromDate, toDate } = req.body;
      const author = req.user.id;
      const quizes = await QuizService.findInterval(author, template, fromDate, toDate);
      res.json(quizes);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const quizId = req.body.id;
      const deleteResult = await QuizService.delete(quizId);
      res.json(deleteResult);
    } catch (e) {
      next(e);
    }
  }
  async getQuizesForMe(req, res, next) {
    try {
      const user = req.user.id;
      const quizes = await QuizService.getQuizesForMe(user);
      res.json(quizes);
    } catch (e) {
      next(e);
    }
  }
  async getQuizQuestions(req, res, next) {
    try {
      const quiz = req.params.quiz;
      const questions = await QuizService.getQuizQuestions(quiz);
      res.json(questions);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new QuizController();
