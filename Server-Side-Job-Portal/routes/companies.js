const router = require('express').Router()
const ControllerCategory = require('../controllers/companies')
const { authentication } = require('../middlewares/authentication')


router.get('/', authentication, ControllerCategory.getCompanies)
router.post('/', authentication, ControllerCategory.createCompanies)
router.get('/:id', authentication, ControllerCategory.getCompaniesById)
router.delete('/:id',authentication, ControllerCategory.deleteCompanies)


module.exports = router