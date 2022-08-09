const AccessModel = require('../models/access-model');
const QuizTemplateModel = require('../models/quizTemplate-model');

class AccessService {
  async create(user) {
    const access = await AccessModel.create({ user });
    setTimeout(async () => {
      await AccessModel.deleteOne({ user });
    }, 60000);
    return access;
  }
  async getCreatedTemplates(user) {
    const accessArray = await AccessModel.find({ user });
    const access = accessArray[0];
    let templates = [];
    for (let i = 0; i < access.templates.length; i++) {
      let template = await QuizTemplateModel.findById(template);
      templates.push(template);
    }
    return templates;
  }
}

module.exports = new AccessService();
