const router = require('express').Router()
const Controller = require('../controllers/jobs')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')



router.get('/', authentication, Controller.getJobs)
router.post('/', authentication, Controller.createJob)
router.get('/:id', authentication, Controller.getJobsById)
router.delete('/:id', authentication, authorization, Controller.deleteJob)



router.put('/:id', authentication, authorization, Controller.editJob)
router.patch('/:id/status', authentication, authorization, Controller.updateStatus)



module.exports = router