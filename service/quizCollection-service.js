const QuizCollectionModel = require('../models/quizCollection-model');
const moment = require('moment');
const QuizModel = require('../models/quiz-model');

class QuizCollectionService {
  async getAll(author) {
    const quizCollections = await QuizCollectionModel.find({ author });
    return quizCollections;
  }
  async findInterval(template, fromDate, toDate) {
    let quizes;
    let firstDate = moment(fromDate);
    let lastDate = moment(toDate);
    quizes = await QuizCollectionModel.find({
      template,
      createdAt: {
        $gte: firstDate.toDate(),
        $lte: lastDate.toDate(),
      },
    }).sort({ createdAt: 1 });
    return quizes;
  }
}

module.exports = new QuizCollectionService();
