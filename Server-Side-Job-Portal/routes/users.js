const router = require('express').Router()
const ControllerUser = require('../controllers/users')


router.get('/',(req,res)=>{
    res.status(200) //memberi status dari respon yang diminta
    .json({ massage: "TES UPDATES USER" }) //balikan data yang diberikan saat memberi respon
})

router.post('/register',ControllerUser.register)
router.post('/login',ControllerUser.login)
router.post('/google-sign-in',ControllerUser.loginWithGoogle)


module.exports = router