const TeamService = require("../service/team-service")

class TeamController {
    async create(req, res, next) { // add name of team
        try {
            const {trainer, players, name} = req.body
            const teams = await TeamService.create(trainer, players, name)
            res.json(teams)
        } catch(e) {
            next(e)
        }
    }
    async getAll(req, res, next) {
        try {
            const trainer = req.params.id
            const teams = await TeamService.getAll(trainer)
            res.json(teams)
        } catch (e) {
            next(e)
        }
    }
    async deleteTeam(req, res, next) {
        try {
            const teamId = req.params.id
            const team = await TeamService.deleteTeam(teamId)
            res.json(team)
        } catch(e) {
            next(e)
        }
    }
    async deletePlayer(req, res, next) {
        try {
            const {teamId, id} = req.body
            const teams = await TeamService.deletePlayer(teamId, id)
            res.json(teams)
        } catch(e) {
            next(e)
        }
    }
    async pushPlayer(req, res, next) {
        try {
            const {userId, teamId} = req.body
            const teams = await TeamService.pushPlayer(userId, teamId)
            res.json(teams)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new TeamController()