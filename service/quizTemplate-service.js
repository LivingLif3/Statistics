const QuizTemplateModel = require('../models/quizTemplate-model');
const QuestionTemplateModel = require('../models/questionTemplate-model');
const AccessTimeModel = require('../models/accessTime-model');
const AccessTimeService = require('./accessTime-service');

class QuizTemplate {
  async create(title, author, questions, description, custom) {
    // questions - array, with objects
    const quiz = await QuizTemplateModel.create({
      title,
      author,
      description,
      custom,
    });
    for (let i = 0; i < questions.length; i++) {
      await QuestionTemplateModel.create({
        quiz: quiz._id,
        text: questions[i].text,
        number: i + 1,
      });
    }
    const newQuestions = await QuestionTemplateModel.find({ quiz: quiz._id });
    newQuestions.forEach((question) => {
      quiz.questions.push(question._id);
    });
    quiz.save();
    return quiz;
  }
  async getAll(author) {
    //questions.question
    const quizes = await QuizTemplateModel.find({ author }).populate({
      path: 'questions',
      populate: {
        path: 'question',
        model: 'QuestionTemplate',
      },
    });
    return quizes;
  }
  async delete(id, author) {
    const quiz = await QuizTemplateModel.findById(id);
    if (!quiz) {
      throw new Error('Опрос не найден');
    }
    const accessTime = await AccessTimeModel.find({ template: quiz._id });
    if (accessTime) {
      await AccessTimeService.stopDailyAccess(accessTime[0]._id);
    }
    const deleteResult = await QuizTemplateModel.deleteOne({ _id: id });
    let templates = await this.getAll(author);
    return templates;
  }
  async findTemplateQuestions(id) {
    const questions = await QuestionTemplateModel.find({ quiz: id });
    console.log(questions);
    return questions;
  }
}

module.exports = new QuizTemplate();
