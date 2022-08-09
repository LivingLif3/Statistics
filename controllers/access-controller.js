const AccessService = require('../service/access-service');
const AccessTimeService = require('../service/accessTime-service');

class AccessController {
  async create(req, res, next) {
    try {
      const user = req.user.id;
      const access = await AccessService.create(user);
      res.json(access);
    } catch (e) {
      next(e);
    }
  }
  async createRepeat(req, res, next) {
    try {
      const user = req.user.id;
      const access = await AccessTimeService.create(user);
      res.json(access);
    } catch (e) {
      next(e);
    }
  }
  async stopRepeat(req, res, next) {
    try {
      const { access } = req.body;
      await AccessTimeService.stopDailyAccess(access);
      res.json({ message: 'Stop' });
    } catch (e) {
      next(e);
    }
  }
  async getCreatedTemplates(req, res, next) {
    try {
      const user = req.user.id;
      const templates = await AccessService.getCreatedTemplates(user);
      res.json(templates);
    } catch (e) {
      next(e);
    }
  }
  async getDailyCreatedTemplates(req, res, next) {
    try {
      const user = req.user.id;
      const templates = await AccessTimeService.getDailyQuizTemplates(user);
      res.json(templates);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AccessController();
