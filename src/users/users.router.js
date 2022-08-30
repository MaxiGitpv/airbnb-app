const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)


const userServices = require('./users.http')



//RUTAS DE USUARIOS

    router.route('/')   //* /api/v1/users/
        .get(userServices.getAll)
        .post(userServices.register)

        router.route('/:id')  //* /api/v1/users/:id
        .get(userServices.getById)
        .put(userServices.edit)
        .delete(userServices.remove)  
        
    router.route('/me/posts') //* /api/v1/users/me/posts
        .get(passport.authenticate('jwt', {session: false}), userServices.getuserPost)
    
    router.route('/me/posts/:id') //* /api/v1/users/me/posts/:id 
        .get(passport.authenticate('jwt', {session: false}), userServices.postgetById)
        .put(passport.authenticate('jwt', {session: false}), userServices.postedit)
        .delete(passport.authenticate('jwt', {session: false}), userServices.postremove)
    
    
        





exports.router =  router