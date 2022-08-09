const UserDto = require('../dtos/user-dto');
const TeamModel = require('../models/team-model');
const UserModel = require('../models/user-model');

class TeamService {
  async create(trainer, players, name) {
    const team = await TeamModel.create({
      trainers: [trainer],
      players,
      name,
    });
    let user = await UserModel.findById(trainer);
    user.team = team._id;
    await user.save();
    const teams = await TeamModel.findById(team._id);
    return [teams];
  }
  async getAll(trainer) {
    const teams = await TeamModel.find({
      trainers: {
        $elemMatch: {
          $eq: trainer,
        },
      },
    });
    return teams;
  }
  async deleteTeam(teamId) {
    const team = await TeamModel.deleteOne({ _id: teamId });
    return team;
  }
  async deletePlayer(teamId, id) {
    const team = await TeamModel.find({ _id: teamId });
    let index = team[0].players.indexOf(id);
    let indexOfTrainers = team[0].trainers.indexOf(id);
    if (index !== -1) {
      team[0].players.splice(index, 1);
    } else if (indexOfTrainers !== -1) {
      team[0].trainers.splice(index, 1);
    }
    team[0].save();
    const teams = await TeamModel.find({
      trainers: {
        $elemMatch: {
          $eq: team[0].trainers[0],
        },
      },
    });
    const player = await UserModel.findById(id);
    player.team = null;
    await player.save();
    return teams;
  }
  async deleteTrainer(teamId, id) {
    const team = await TeamModel.find({ _id: teamId });
    let index = team[0].trainers.indexOf(id);
    team[0].trainers.splice(index, 1);
    team[0].save();
    const teams = await TeamModel.find({
      trainers: {
        $elemMatch: {
          $eq: team[0].trainers[0],
        },
      },
    });
    const player = await UserModel.findById(id);
    player.team = null;
    await player.save();
    return teams;
  }
  async pushPlayer(userId, teamId) {
    const team = await TeamModel.find({ _id: teamId });
    const player = await UserModel.findById(userId);
    let index = team[0].players.indexOf(userId);
    let indexOfTrainers = team[0].trainers.indexOf(userId);
    if (index === -1 && indexOfTrainers === -1) {
      team[0].players.push(userId);
      await team[0].save();
      player.team = team[0]._id;
      await player.save();
    }
    const teams = await TeamModel.find({
      trainers: {
        $elemMatch: {
          $eq: team[0].trainers[0],
        },
      },
    });
    if (index === -1) {
      return teams;
    }
    return teams;
  }
  async pushTrainer(userId, teamId) {
    const team = await TeamModel.find({ _id: teamId });
    const player = await UserModel.findById(userId);
    let index = team[0].trainers.indexOf(userId);
    let indexOfPlayers = team[0].players.indexOf(userId);
    if (index === -1 && indexOfPlayers === -1) {
      team[0].trainers.push(userId);
      await team[0].save();
      player.team = team[0]._id;
      await player.save();
    }
    const teams = await TeamModel.find({
      trainers: {
        $elemMatch: {
          $eq: team[0].trainers[0],
        },
      },
    });
    if (index === -1) {
      return teams;
    }
    return teams;
  }
  async getTeamPlayers(teamId) {
    const team = await TeamModel.findById(teamId);
    let players = [];
    if (team) {
      for (let i = 0; i < team.players.length; i++) {
        let player = await UserModel.findById(team.players[i]);
        players.push(player);
      }
    }
    // team.players.forEach(async playerId => {
    //     let player = await UserModel.findById(playerId)
    //     console.log(player)
    //     await players.push(player)
    // });
    // console.log(players)
    return players;
  }
  async getTeamTrainers(teamId) {
    const team = await TeamModel.findById(teamId);
    let trainers = [];
    if (team) {
      for (let trainer of team.trainers) {
        let trainerModel = await UserModel.findById(trainer);
        trainers.push(trainerModel);
      }
    }
    return trainers;
  }
  async checkUniqueTeamName(name) {
    let success;
    const team = await TeamModel.find({ name });
    console.log(team);
    if (team.length === 0) {
      success = true;
    } else {
      success = false;
    }
    return { success };
  }
}

module.exports = new TeamService();
