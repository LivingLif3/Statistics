const QuizModel = require('../models/quiz-model');
const QuestionModel = require('../models/question-model');
const QuizCollectionModel = require('../models/quizCollection-model');
const QuizTemplateModel = require('../models/quizTemplate-model');
const QuizTemplateService = require('./quizTemplate-service');
const moment = require('moment');
const AccessTimeModel = require('../models/accessTime-model');
const QuestionAnswerModel = require('../models/questionAnswer-model');

class QuizService {
  async create(quizId, author, users, repeat) {
    //сделать на сервере new Date, чтобы меньше параметров передавать в функцию
    let date = moment();
    const createdQuizes = [];
    let questions;
    let titleBuffer = await QuizTemplateModel.findById(quizId);
    let title = titleBuffer.title;
    questions = await QuizTemplateService.findTemplateQuestions(quizId);
    questions.map((question) => ({ text: question.text, id: question._id }));
    for (let i = 0; i < users.length; i++) {
      let quiz = await QuizModel.create({
        title,
        date,
        author,
        user: users[i],
        repeat,
        template: quizId,
        custom: titleBuffer.custom,
      });
      createdQuizes.push(quiz._id);
    }
    // const quiz = await QuizModel.create({
    //     title,
    //     month,
    //     day,
    //     year,
    //     author
    // })
    for (let quiz = 0; quiz < createdQuizes.length; quiz++) {
      for (let i = 0; i < questions.length; i++) {
        await QuestionModel.create({
          quiz: createdQuizes[quiz]._id,
          date,
          text: questions[i].text,
          number: i + 1,
          questionTemplate: questions[i].id,
        });
      }
    }
    for (let i = 0; i < createdQuizes.length; i++) {
      let quizQuestions = await QuestionModel.find({ quiz: createdQuizes[i] });
      let quiz = await QuizModel.findById(createdQuizes[i]);
      quizQuestions.forEach((question) => {
        quiz.questions.push(question._id);
      });
      await quiz.save();
    }
    // const quizQuestions = await QuestionModel.find({quiz: quiz._id})
    // quizQuestions.forEach(question => {
    //     quiz.questions.push(question._id)
    // })
    // quiz.save()
    const quizesReturn = [];
    for (let i = 0; i < createdQuizes.length; i++) {
      let quiz = await QuizModel.findById(createdQuizes[i]);
      quizesReturn.push(quiz);
      setTimeout(() => {
        // Здесь удаляем опрос через месяц.
        this.delete(quiz._id);
      }, 1000 * 3600 * 24 * 14);
      setTimeout(async () => {
        //Время за которое мы можем пройти тест
        quiz.end = true;
        await quiz.save();
      }, 1000 * 3600 * 6);
      if (quiz.repeat) {
        quiz.repeat = false;
        await quiz.save();
        let timer = setTimeout(async () => {
          let access = await AccessTimeModel.find({ user: author, template: quizId });
          if (access.length > 0) {
            clearTimeout(timer);
            this.create(quizId, author, [quiz.user], true);
          } else {
            clearTimeout(timer);
          }
        }, 1000 * 3600 * 24); //создаем опрос через 1 день
      }
    }
    const quizCollectionModel = await QuizCollectionModel.create({
      template: quizId,
      title,
      date,
      author,
      quizes: createdQuizes,
    });
    for (let i = 0; i < createdQuizes.length; i++) {
      let quiz = await QuizModel.findById(createdQuizes[i]);
      quiz.quizCollection = quizCollectionModel._id;
      await quiz.save();
    }
    return quizesReturn;
  }

  async findInterval(author, template, fromDate, toDate) {
    let quizes;
    let firstDate = moment(fromDate);
    let lastDate = moment(toDate);
    quizes = await QuizModel.find({
      author,
      template,
      createdAt: {
        $gte: firstDate.toDate(),
        $lte: lastDate.toDate(),
      },
    });
    return quizes;
  }
  async getQuizQuestions(quiz) {
    let questions = await QuestionModel.find({ quiz });
    return questions;
  }
  async delete(quizId) {
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      throw new Error('Опрос не найден');
    }
    const deleteResult = await QuizModel.deleteOne({ _id: quizId });
    return deleteResult;
  }
  async getQuizesForMe(user) {
    const quizes = await QuizModel.find({ user, answered: false, end: false });
    return quizes;
  }
}

module.exports = new QuizService();
