//* Dependencias
const express = require('express')
const path = require('path')
const {db} = require('./utils/database')




// dependencias de Rutas de autenticacion
const passport = require('passport')
require('./middleware/auth.middleware')(passport)





//* Configuraciones iniciales
const app = express()



// database (Siqueluze)
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch(err => console.log(err))

db.sync()
    .then(()=> console.log('Database synced'))
    .catch(err => console.log(err))

    



// Esta confirmacion es para habilitar el req.body
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Bienvenidos ami aPP'})
})





// db.authenticate()
//     .then( () => console.log('Database Authenticated'))
//     .catch(err => console.log(err))

// db.sync()
// .then(()=> console.log( 'Database synced'))
// .catch(err => console.log(err))

// Archivos de rutas
const userRouter = require('./users/users.router').router
const postsRouter = require('./users/posts.router').router

const authRouter = require('./auth/auth.router').router


app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/auth', authRouter)


// Rutas protegidas
app.get('/api/v1/uploads/:imgName', (req, res ) => {
    const imgName = req.params.imgName
    res.status(200).sendFile( path.resolve('uploads/') + '/'+ imgName )
})










app.listen(5000, ()=> {
    console.log('server started at port 5000')
})

exports.default = app
exports.app = app
module.exports = app