const Router = require('express').Router
const TeamController = require('../controllers/team-controller')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/team', authMiddleware, TeamController.create)
router.post('/player', authMiddleware, TeamController.deletePlayer)
router.post('/pushPlayer', authMiddleware, TeamController.pushPlayer)
router.get('/team/:id', authMiddleware, TeamController.getAll)
router.delete('/team/:id',  authMiddleware, TeamController.deleteTeam)

module.exports = router