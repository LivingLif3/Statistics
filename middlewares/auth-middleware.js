const tokenService = require('../service/token-service')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.token
        if(!authorizationHeader) {
            return next(res.status(403).json({message: "Пользователь не авторизован"}))
        }
        
        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken) {
            return next(res.status(403).json({message: "Пользователь не авторизован"}))
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            return next(res.status(403).json({message: "Пользователь не авторизован"}))
        }

        req.user = userData
        next()
    } catch(e) {
        return next(e)
    }
}