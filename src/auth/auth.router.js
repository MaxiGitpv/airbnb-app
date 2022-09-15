const router = require('express').Router()

const authServices = require('./auth.http')
const {register} = require('../users/users.http')


router.post('/login', authServices.login)
router.post('/register', register)

//* /api/v1/auth/login

exports.router = router
