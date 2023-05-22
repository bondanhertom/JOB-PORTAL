const router = require('express').Router()
const Controller = require('../controllers/histories')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')



router.get('/', authentication, Controller.getHistory)


module.exports = router