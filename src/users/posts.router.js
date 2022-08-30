const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const postServices = require('./users.http')

//RUTAS DE POSTS

router.route('/')   //* /api/v1/posts/
    .get(passport.authenticate('jwt', {session: false}), postServices.postgetAll)
    .post(passport.authenticate('jwt', {session: false}), postServices.postregister)

router.route('/:id')  //* /api/v1/posts/:id
    .get(passport.authenticate('jwt', {session: false}), postServices.postgetById)
    


    

exports.router =  router