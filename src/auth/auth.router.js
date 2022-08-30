const router = require('express').Router()

const authServices = require('./auth.http')

router.post('/login', authServices.login)
//* /api/v1/auth/login

exports.router = router
