const AccessModel = require('../models/access-model');
const AccessTimeModel = require('../models/accessTime-model');
const UserModel = require('../models/user-model');
const AccessService = require('../service/access-service');
const AccessTimeService = require('../service/accessTime-service');

module.exports = async (req, res, next) => {
  let template = req.body.quizId;
  let user = req.user.id;
  let access;
  if (req.body.repeat) {
    access = await AccessTimeModel.find({ user });
    if (access.length >= 0 && access.length < 2) {
      await AccessTimeService.create(user, template);
      return next();
    }
    if (access.length === 2) {
      return res.json({ message: 'Лимит исчерпан' });
    }
  } else {
    access = await AccessModel.find({ user });
    if (access.length > 0 && access[0].templates.length < 2) {
      let index = access[0].templates.indexOf(template);
      if (index != -1) {
        return next();
      } else if (index === -1) {
        access[0].templates.push(template);
        await access[0].save();
        return next();
      }
    }
    if (access.length > 0 && access[0].templates.length === 2) {
      let index = access[0].templates.indexOf(template);
      if (index != -1) {
        return next();
      } else {
        return res.json({ message: 'Лимит исчерпан' });
      }
    }
    if (access.length === 0) {
      let accessCreated = await AccessService.create(user);
      accessCreated.templates.push(template);
      await accessCreated.save();
      return next();
    }
    return res.json({ message: 'Лимит исчерпан' });
  }
};
