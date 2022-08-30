//* Dependencias
const express = require('express')

// dependencias de Rutas de autenticacion
const passport = require('passport')
require('./middleware/auth.middleware')(passport)


//* Configuraciones iniciales
const app = express()

// Esta confirmacion es para habilitar el req.body
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Bienvenidos ami aPP'})
})




// Archivos de rutas
const userRouter = require('./users/users.router').router
const postsRouter = require('./users/posts.router').router

const authRouter = require('./auth/auth.router').router


app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/auth', authRouter)


// Rutas protegidas
app.get('/example', 
    passport.authenticate('jwt', {session: false}),    
    (req, res ) => {
    res.status(200).json({message: 'Bienvenido a mi ruta protegida', email: req.user.email, pass: req.user.password })
})





app.listen(5000, ()=> {
    console.log('server started at port 5000')
})
