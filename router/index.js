const Router = require('express').Router
const quizRouter = require("./quiz-router")
const quizTemplateRouter = require('./quizTemplate-router')
const teamRouter = require('./team-router')
const userRouter = require('./user-router')
const questionAnswerRouter = require('./questionAnswer-router')

const router = new Router()


router.use('/api', quizRouter)
router.use('/api', quizTemplateRouter)
router.use('/api', teamRouter)
router.use('/api', userRouter)
router.use('/api', questionAnswerRouter)

module.exports = router