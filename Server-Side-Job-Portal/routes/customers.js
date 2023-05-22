const router = require('express').Router()
const ControllerCustomer = require('../controllers/customers')
const { authenticationCus } = require('../middlewares/authentication')




router.post('/users/register', ControllerCustomer.register)
router.post('/users/login', ControllerCustomer.login)
router.post('/users/google-sign-in', ControllerCustomer.loginWithGoogle)




router.get('/jobs', ControllerCustomer.getJobs)

router.post('/bookmarks',authenticationCus, ControllerCustomer.createBookmark)

router.get('/jobs/:id', ControllerCustomer.getDetailJob)

router.get('/bookmarks/:id',authenticationCus, ControllerCustomer.getBookmarkByUserId)


module.exports = router