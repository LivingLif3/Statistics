const TeamService = require('../service/team-service');

class TeamController {
  async create(req, res, next) {
    // add name of team
    try {
      const { players, name } = req.body;
      const trainer = req.user.id;
      const teams = await TeamService.create(trainer, players, name);
      res.json(teams);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const trainer = req.user.id;
      const teams = await TeamService.getAll(trainer);
      res.json(teams);
    } catch (e) {
      next(e);
    }
  }
  async deleteTeam(req, res, next) {
    try {
      const teamId = req.user.id;
      const team = await TeamService.deleteTeam(teamId);
      res.json(team);
    } catch (e) {
      next(e);
    }
  }
  async deletePlayer(req, res, next) {
    try {
      const { teamId, id } = req.body;
      const teams = await TeamService.deletePlayer(teamId, id);
      res.json(teams);
    } catch (e) {
      next(e);
    }
  }
  async pushPlayer(req, res, next) {
    try {
      const { userId, teamId } = req.body;
      const teams = await TeamService.pushPlayer(userId, teamId);
      res.json(teams);
    } catch (e) {
      next(e);
    }
  }
  async pushTrainer(req, res, next) {
    try {
      const { userId, teamId } = req.body;
      const teams = await TeamService.pushTrainer(userId, teamId);
      res.json(teams);
    } catch (e) {
      next(e);
    }
  }
  async deleteTrainer(req, res, next) {
    try {
      const { teamId, id } = req.body;
      const teams = await TeamService.deleteTrainer(teamId, id);
      res.json(teams);
    } catch (e) {
      next(e);
    }
  }
  async getTeamPlayers(req, res, next) {
    try {
      const teamId = req.params.id;
      const players = await TeamService.getTeamPlayers(teamId);
      res.json(players);
    } catch (e) {
      next(e);
    }
  }
  async getTeamTrainers(req, res, next) {
    try {
      const teamId = req.params.id;
      const trainers = await TeamService.getTeamTrainers(teamId);
      res.json(trainers);
    } catch (e) {
      next(e);
    }
  }
  async checkUniqueTeamName(req, res, next) {
    try {
      const { name } = req.params;
      const success = await TeamService.checkUniqueTeamName(name);
      res.json(success);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TeamController();
