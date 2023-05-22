const express = require("express");
const router = express.Router();
const jobsRouter = require('./jobs')
const usersRouter = require('./users')
const categoriesRouter = require('./companies')
const historiesRouter = require('./histories')
const customersRouter = require('./customers')

router.get('/', (req, res) => {
    res.status(200) //memberi status dari respon yang diminta
        .json({ massage: "TES UPDATES" }) //balikan data yang diberikan saat memberi respon
})
router.use('/users', usersRouter)
router.use('/jobs', jobsRouter)
router.use('/companies', categoriesRouter)
router.use('/histories', historiesRouter)

router.use('/pub', customersRouter)






module.exports = router