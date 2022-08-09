const Router = require('express').Router;
const TeamController = require('../controllers/team-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/team', authMiddleware, TeamController.create);
router.post('/player', authMiddleware, TeamController.deletePlayer);
router.post('/trainer', authMiddleware, TeamController.deleteTrainer);
router.post('/pushPlayer', authMiddleware, TeamController.pushPlayer);
router.post('/pushTrainer', authMiddleware, TeamController.pushTrainer);
router.get('/checkUniqueTeam/:name', authMiddleware, TeamController.checkUniqueTeamName);
router.get('/team', authMiddleware, TeamController.getAll);
router.get('/team/:id', authMiddleware, TeamController.getTeamPlayers);
router.get('/trainers/:id', authMiddleware, TeamController.getTeamTrainers);
router.delete('/team', authMiddleware, TeamController.deleteTeam);

module.exports = router;
