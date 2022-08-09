const AccessTimeModel = require('../models/accessTime-model');
const QuizTemplateModel = require('../models/quizTemplate-model');
const QuizService = require('../service/quiz-service');

let timers = [];

class AccessTimeService {
  async create(user, template) {
    const access = await AccessTimeModel.create({ user });
    access.template = template;
    let timerId = setTimeout(async () => {
      let index = timers.findIndex((element) => element.access === access._id.toString());
      timers.splice(index, 1);
      await AccessTimeModel.deleteOne({ _id: access._id });
      this.create(user, template);
    }, 1000 * 3600 * 24);
    access.timeoutId = timerId;
    timers.push({ timer: timerId, access: access._id.toString() });
    await access.save();
    return access;
  }
  async stopDailyAccess(accessId) {
    const access = await AccessTimeModel.findById(accessId);
    let index = timers.findIndex((element) => {
      return element.access === access._id.toString();
    });
    if (access) {
      clearTimeout(timers[index].timer);
      timers.splice(index, 1);
    }
    await AccessTimeModel.deleteOne({ _id: access._id });
  }
  async getDailyQuizTemplates(user) {
    const accesses = await AccessTimeModel.find({ user });
    console.log(accesses);
    let templatesId = [],
      templates = [];
    for (let i = 0; i < accesses.length; i++) {
      templatesId.push(accesses[i].template);
    }
    for (let i = 0; i < templatesId.length; i++) {
      let template = await QuizTemplateModel.findById(templatesId[i]);
      templates.push(template);
    }
    return templates;
  }
}

module.exports = new AccessTimeService();
