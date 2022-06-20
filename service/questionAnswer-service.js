const QuestionAnswerModel = require("../models/questionAnswer-model")
const TeamModel = require("../models/team-model")

class QuestionAnswerService {
    async create(quiz, answers, user) {
        let avarageAnswer = 0
        answers.forEach(answer => {
            avarageAnswer += answer.answer
        })
        avarageAnswer /= answers.length
        const answer = await QuestionAnswerModel.create({quiz, answers, user, avarageAnswer})
        return answer
    }
    async getTeamAnswers(team, quiz) {
        const teamAnswers = []
        const Team = await TeamModel.find({_id: team})
        for(let i = 0; i < Team[0].players.length; i++) {
            const answer = await QuestionAnswerModel.find({quiz, user: Team[0].players[i]})
            if(answer[0]) {
                teamAnswers.push(answer[0])
                console.log(teamAnswers, 'here')
            }
        }
       return teamAnswers
    }
    async getUserAnswer(user, quiz) {
        const answer = await QuestionAnswerModel.find({user, quiz})
        return answer[0]
    }
}

module.exports = new QuestionAnswerService()