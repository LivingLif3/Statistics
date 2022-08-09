const QuestionAnswerService = require('../service/questionAnswer-service');

class QuestionAnswerController {
  async create(req, res, next) {
    try {
      const { quiz, answers } = req.body; //user уже  не нужно
      let user = req.user.id;
      const quizes = await QuestionAnswerService.create(quiz, answers, user);
      res.json(quizes);
    } catch (e) {
      next(e);
    }
  }
  async createCustomAnswer(req, res, next) {
    try {
      const { quiz, answers } = req.body;
      let user = req.user.id;
      const quizes = await QuestionAnswerService.createCustomAnswer(quiz, answers, user);
      res.json(quizes);
    } catch (e) {
      next(e);
    }
  }
  async getTeamAnswers(req, res, next) {
    try {
      const { team, quiz } = req.body;
      const answers = await QuestionAnswerService.getTeamAnswers(team, quiz);
      res.json(answers);
    } catch (e) {
      next(e);
    }
  }
  async getUserAnswer(req, res, next) {
    try {
      const { user, quiz } = req.body;
      const answer = await QuestionAnswerService.getUserAnswer(user, quiz);
      res.json(answer);
    } catch (e) {
      next(e);
    }
  }
  async findInterval(req, res, next) {
    try {
      const { template, fromDate, toDate } = req.body;
      const teamResults = await QuestionAnswerService.findInterval(template, fromDate, toDate);
      res.json(teamResults);
    } catch (e) {
      next(e);
    }
  }
  async findCustomInterval(req, res, next) {
    try {
      const { template, fromDate, toDate } = req.body;
      const teamResults = await QuestionAnswerService.findCustomInterval(
        template,
        fromDate,
        toDate,
      );
      res.json(teamResults);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new QuestionAnswerController();
