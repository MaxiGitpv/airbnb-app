const router = require('express').Router()
const passport = require('passport')
const {upload} = require('../utils/multer')



// const { TimeoutError } = require('sequelize/types')

const { rolAsminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)


const userServices = require('./users.http')



//RUTAS DE USUARIOS

    router.route('/')   //* /api/v1/users/
        .get(userServices.getAll)
        .post(userServices.register)
    
   

    router.route('/me')
        .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
        .put(passport.authenticate('jwt', {session: false}), userServices.ediMyUser)
        .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

        
    // RUTAS PARA MULTER
    router.route('/me/profile-img')
        .post(passport.authenticate('jwt', {session: false}), upload.single('profile-img'), userServices.postProfileImg)



    router.route('/:id')  //* /api/v1/users/:id
        .get(userServices.getById)
        .put(userServices.edit)
        .delete(passport.authenticate('jwt', {session: false}), rolAsminMiddleware, userServices.remove)
        

    router.route('/me/posts') //* /api/v1/users/me/posts
        .get(passport.authenticate('jwt', {session: false}), userServices.getuserPost)
    
    router.route('/me/posts/:id') //* /api/v1/users/me/posts/:id 
        .get(passport.authenticate('jwt', {session: false}), userServices.postgetById)
        .put(passport.authenticate('jwt', {session: false}), userServices.postedit)
        .delete(passport.authenticate('jwt', {session: false}), userServices.postremove)
    
    
        





exports.router =  router