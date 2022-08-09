const Router = require('express').Router
const UserController = require('../controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/registration', body('email').isEmail(), 
    body('password').isLength({min: 6, max: 32}), UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/refreshPassword', UserController.refreshPassword)
router.post('/uploadImage', authMiddleware, UserController.uploadAvatar)
router.post('/deleteImage', authMiddleware, UserController.deleteAvatar)
router.post('/updateInfo', authMiddleware, UserController.update)
router.get('/refresh', UserController.refresh)
router.get('/activate/:link', UserController.activate)
router.get('/refreshPassword/:link', UserController.changePassword)
router.get('/user', UserController.getUsers)

module.exports = router