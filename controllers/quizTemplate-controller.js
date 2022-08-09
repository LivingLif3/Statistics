const quizTemplateService = require('../service/quizTemplate-service');

class QuizTemplateController {
  async create(req, res, next) {
    try {
      const { title, questions, description, custom } = req.body;
      const author = req.user.id;
      const quiz = await quizTemplateService.create(title, author, questions, description, custom);
      res.json(quiz);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const author = req.user.id;
      const quizes = await quizTemplateService.getAll(author);
      res.json(quizes);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const quizId = req.params.id;
      let author = req.user.id;
      const templates = await quizTemplateService.delete(quizId, author);
      res.json(templates);
    } catch (e) {
      next(e);
    }
  }
  async findTemplateQuestions(req, res, next) {
    try {
      const quizId = req.params.id;
      const questions = await quizTemplateService.findTemplateQuestions(quizId);
      res.json(questions);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new QuizTemplateController();
