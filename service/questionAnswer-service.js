const QuestionAnswerModel = require('../models/questionAnswer-model');
const QuizModel = require('../models/quiz-model');
const TeamModel = require('../models/team-model');
const UserModel = require('../models/user-model');
const QuizCollectionService = require('./quizCollection-service');
const moment = require('moment');
const QuestionModel = require('../models/question-model');
const CustomQuestionAnswerModel = require('../models/customQuestionAnswer-model');

class QuestionAnswerService {
  async create(quiz, answers, user) {
    let quizModel = await QuizModel.findById(quiz);
    quizModel.answered = true;
    await quizModel.save();
    let avarageAnswer = 0;
    const questions = await QuestionModel.find({ quiz });
    questions.forEach((question) => {
      answers.forEach((answer) => {
        if (answer.question.toString() === question._id.toString()) {
          answer.questionTemplate = question.questionTemplate;
        }
      });
    });
    answers.forEach((answer) => {
      avarageAnswer += answer.answer;
    });
    avarageAnswer /= answers.length;
    const answer = await QuestionAnswerModel.create({
      quiz,
      answers,
      user,
      avarageAnswer,
      template: quizModel.template,
      quizCollection: quizModel.quizCollection,
    });
    const quizesForMe = await QuizModel.find({ user, end: false, answered: false });
    return quizesForMe;
  }
  async createCustomAnswer(quiz, answers, user) {
    let quizModel = await QuizModel.findById(quiz);
    quizModel.answered = true;
    await quizModel.save();
    const questions = await QuestionModel.find({ quiz });
    questions.forEach((question) => {
      answers.forEach((answer) => {
        if (answer.question.toString() === question._id.toString()) {
          answer.questionTemplate = question.questionTemplate;
        }
      });
    });
    const answer = await CustomQuestionAnswerModel.create({
      quiz,
      answers,
      user,
      template: quizModel.template,
      quizCollection: quizModel.quizCollection,
    });
    const quizesForMe = await QuizModel.find({ user, end: false, answered: false });
    return quizesForMe;
  }
  async getTeamAnswers(team, quiz) {
    const teamAnswers = [];
    const Team = await TeamModel.find({ _id: team });
    for (let i = 0; i < Team[0].players.length; i++) {
      const answer = await QuestionAnswerModel.find({ quiz, user: Team[0].players[i] });
      if (answer[0]) {
        teamAnswers.push(answer[0]);
      }
    }
    return teamAnswers;
  }
  async getUserAnswer(user, quiz) {
    const answer = await QuestionAnswerModel.find({ user, quiz });
    return answer[0];
  }
  async findInterval(template, fromDate, toDate) {
    let questionAnswers;
    let firstDate = moment(fromDate);
    let lastDate = moment(toDate);
    questionAnswers = await QuestionAnswerModel.find({
      template,
      createdAt: {
        $gte: firstDate.toDate(),
        $lte: lastDate.toDate(),
      },
    }).sort({ createdAt: 1 });
    console.log(questionAnswers, 'questionAnswers');
    let quizCollections = await QuizCollectionService.findInterval(template, fromDate, toDate);
    let teamAvResults = [];
    for (let i = 0; i < quizCollections.length; i++) {
      let tempArray = [];
      for (let j = 0; j < questionAnswers.length; j++) {
        if (questionAnswers[j].quizCollection.toString() === quizCollections[i]._id.toString()) {
          tempArray.push(questionAnswers[j]);
        }
      }
      teamAvResults.push(tempArray);
    }
    console.log(teamAvResults, 'teamAvResults');
    return teamAvResults;
  }
  // async getUsers(template) {
  //   let answers = await QuestionAnswerModel.find({ template });
  //   let answersUsers = answers.map((answer) => answer.user);
  //   let users = answersUsers.filter((item, index) => {
  //     return answersUsers.indexOf(item) === index;
  //   });
  //   let usersData = [];
  //   for (let user of users) {
  //     let userData = await UserModel.findById(user);
  //     usersData.push(userData);
  //   }
  //   return usersData;
  // }
  async findCustomInterval(template, fromDate, toDate) {
    let questionAnswers;
    let firstDate = moment(fromDate);
    let lastDate = moment(toDate);
    questionAnswers = await CustomQuestionAnswerModel.find({
      template,
      createdAt: {
        $gte: firstDate.toDate(),
        $lte: lastDate.toDate(),
      },
    }).sort({ createdAt: 1 });
    let quizCollections = await QuizCollectionService.findInterval(template, fromDate, toDate);
    let teamAvResults = [];
    for (let i = 0; i < quizCollections.length; i++) {
      let tempArray = [];
      for (let j = 0; j < questionAnswers.length; j++) {
        if (questionAnswers[j].quizCollection.toString() === quizCollections[i]._id.toString()) {
          tempArray.push(questionAnswers[j]);
        }
      }
      teamAvResults.push(tempArray);
    }
    return teamAvResults;
  }
}

module.exports = new QuestionAnswerService();
