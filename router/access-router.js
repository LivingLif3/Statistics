const Router = require('express').Router;
const AccessController = require('../controllers/access-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/access', authMiddleware, AccessController.create);
router.post('/accessRepeat', authMiddleware, AccessController.createRepeat);
router.post('/stopRepeat', authMiddleware, AccessController.stopRepeat);
router.get('/createdTemplates', authMiddleware, AccessController.getCreatedTemplates);
router.get('/createdDailyTemplates', authMiddleware, AccessController.getDailyCreatedTemplates);

module.exports = router;
