const TeamModel = require('../models/team-model')

class TeamService {
    async create(trainer, players, name) {
        await TeamModel.create({
            trainer,
            players,
            name
        })
        const teams = await TeamModel.find({trainer})
        return teams
    }
    async getAll(trainer) {
        const teams = await TeamModel.find({trainer})
        return teams
    }
    async deleteTeam(teamId) {
        const team = await TeamModel.deleteOne({_id: teamId})
        return team
    }
    async deletePlayer(teamId, id) {
        const team = await TeamModel.find({_id: teamId})
        let index = team[0].players.indexOf(id)
        team[0].players.splice(index, 1)
        team[0].save()
        const teams = await TeamModel.find({trainer: team[0].trainer})
        return teams
    }
    async pushPlayer(userId, teamId) {
        const team = await TeamModel.find({_id: teamId})
        team[0].players.push(userId)
        team[0].save()
        const teams = await TeamModel.find({trainer: team[0].trainer})

        return teams
    }
}

module.exports = new TeamService()