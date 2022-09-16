# 1 Rutas
# _____________________________________________________

-  - /api/v1/users 
-  - /api/v1/users/:id
-  - /api/v1/post 
-  - /api/v1/post/

-  - /api/v1/users/me/posts
-  - /api/v1/users/me/posts/:id 

#_________________________________
1. /api/v1/posts
    1. Crear posts
    2. Ver los posts de todos los usuarios
2. /api/v1/posts/:id 
    1. Ver un post en especifico
3. /api/v1/users/me/posts
    1. Ver unicamente los posts del usuario loggeado
4. /api/v1/users/me/posts/:id 
    1. Ver un post en especifico pero solo los del usuario loggeado
    2. Editar un post
    3. Eliminar un post

# ________________________________



- OK -  /api/v1/users 
- OK - /api/v1/users/:id
- /api/v1/users/me

- OK - /api/v1/users/login
- /api/v1/users/register
- /api/v1/users/password-recovery
- /api/v1/users/verify-account

- /api/v1/users
- - GET (ADMIN)

- /api/v1/users/:id
- - GET 
- - PUT (ADMIN)
- - DELETE (ADMIN)


- /api/v1/users/me
- - GET
- - PUT
- - PATCH
- - DELETE


- /api/v1/users/login
- - POST


- /api/v1/users/register
- - POST 


- /api/v1/users/password-recovery
- - POST
- - PATCH

________________________________
ESTRUCTURA DE ARCHIVOS

node_modules
src
 auth
    auth.controllers.js
    auth.http.js
    auth.router.js
 middleware
    adminRole.js
    auth.middleware.js
 users
   test
     integration.test.js
     unit.test.js
    users.controllers.js
    users.http.js
    users.router.js
 utils
    crypt.js
app.js
.env

________________________________

# PAQUETESY DEPENDEDCIAS

# Dependencias iniciales
    npm init -y
    npm i -D nodemon
    npm i express dotenv

# Dependencias adicionales
    npm i morgan 
    npm i cors
    npm i dotenv
    npx create-react-app

# Dependencias de incriptar contraseñas y aleatorias
    npm i bcrypt 
    npm i uuid
# Dependencias de Authorizacion
    npm i jsonwebtoken

# Dependencias para Login   
    npm install jsonwebtoken
    npm install passport-jwt
    npm install passport

# Dependencias de testing 
    npm i -D mocha chai chai-http

# Dependencias de IMAGENES 
    npm install express multer

# Dependencias de BASES DE DATOS
    npm install sequelize pg pg-hstore



# 2 SRC = Carpeta general ( app.js = Creacion del servidor y el puerto y demas configuracions) 

    # app.js

    ```js
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

    ```






# 3 USERS = Carpetas de usuarios ( users.controllers.js, users.http.js, users.router.js  = Obtener, Crear, Actualizar, Eliminar - Servicios y - Rutas - 
_____________________________________________________





En una carpeta de users con (users.controllers.js)
_____________________________________________________
npm install uuid

Libreria para contraseñas UUID 

const userDB = [] // Crear un arreglo para la base de datos de todos los usuarios y llamar el CRUD

```js

const uuid = require('uuid')
const { hashPassword } = require('../utils/crypt')
const Users = require('../models/user.model')



const userDB = [{
    "id": "e07fe448-b327-4aea-a131-7dc9300c8f56",
    "first_name": "Maximo 1",
    "last_name": "Perea",
    "email": "maxi01@example.com",
    "password": "$2b$10$mTGU0Suc0YrwVfZcvEo83OLxgR5vP8Meea6IV3i9wf29dvmYgPuGS", //? root
    "phone": "+57321548848",
    "birthday_date": "07/12/1990",
    "role": "admin",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
  },
  { 
    "id": "b22bd64e-1a72-4fba-b824-a0f20c2a9a6e",
    "first_name": "Julieth 2",
    "last_name": "Amaya",
    "email": "Juliac@example.com",
    "password": "$2b$10$ETe/HyBFgWwY4ZwzodjnIeGFXv8HX/KtXp0jGlHMgFyEhO1Nmtfo2", //? root123
    "phone": "+57321548848",
    "birthday_date": "08/11/1994",
    "role": "normal",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
    },
    {
    "id": "e4613411-6cda-4761-8337-333ffa6a4eac",
    "first_name": "Matias 3",
    "last_name": "Perea Amaya",
    "email": "mitias2020@example.com",
    "password": "$2b$10$YUDDWTlIvigGQxqCOevhsOqiLpDsCMUBMTrBwVLzGfNPm/.gLtWd6", //? root123456
    "phone": "+57321548848",
    "birthday_date": "9/11/2020",
    "role": "normal",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
    }
]
// CREARE USER
/* {
    "first_name": "Matias 3",
    "last_name": "Perea Amaya",
    "email": "mitias2020@example.com",
    "password": "root123456",
    "phone": "+57321548848",
    "birthday_date": "9/11/2020",
    "rol": "normal",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
    } 
*/


// LOGIN USER
/* 
    {
        "email": "maxi01@example.com",
        "password": "root"

    }
*/


//GET
const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users;
}



//GET/:id
const getUserById = async (id)=> {

    const data = await Users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    }) 
    return data

    // const data = userDB.filter((item) => item.id === id)
    // return data.length ? data[0] : false
    //? select * from users where id = ${id};
}



//POST
// const createUser = async (data) => {
//     const newUser = await Users.create({
//         id: uuid.v4(),
//         first_name: data.first_name, 
//         last_name: data.last_name, 
//         email: data.email, 
//         password: hashPassword(data.password),   
//         phone: data.phone ?  data.phone : '',
//         birthday_date: data.birthday_date,  
//         role: "normal",  
//         profile_image: data.profile_image,
//         country: data.country, 
//         is_active: true, 
//         verified: false 
//     })
//     return newUser
// }


// controlador con siquelize

const createUser = async (data) => {
    const newUser = await Users.create({
        ...data,
        id: uuid.v4(),
        password: hashPassword(data.password),   
        role: "normalitoMijo",  
        is_active: true, 
        verified: true 
    })
    return newUser
}








//PUT
const editUser = async (userId, data, userRol) => {
   

    if(userRol === 'admin'){
        const {id, password, verified, ...newData} = data

        const response = await Users.update({
            ...newData
        }, { 
            where: {
                id: userId
            }
        })
        return response
    } else {
        const {id, password, verified, role, ...newData} = data
        
        const response = await Users.update({
            ...newData
        }, { 
            where: {
                id: userId
            }
        })
        return response
    }

}

//     if (index !== -1){
//         userDB[index] ={
//             id: id,
//             first_name: data.first_name, 
//             last_name: data.last_name,
//             email: data.email, 
//             password: userDB[index].password,
//             phone: data.phone,
//             birthday_date: data.birthday_date,
//             role: userRol === 'admin' ? data.rol: 'normal',
//             profile_image: data.profile_image,
//             country: data.country, 
//             is_active: true, 
//             verified: false
//         } 
//         return userDB[index]
//     }else {
//         return createUser(data)
//     }
// }



//DELETE/:id
const deleteUser = (id) => {
    const data = Users.destroy({
        where: {
            id
        }
    })
    return data
}




//COMPARE PASSWORD 

const getPostByEmail = (email) => {
    const data = userDB.filter(item => item.email === email)
    return data.length ? data[0] : false
} 



const editProfileImg = (userID, imgUrl) => {
    const index = userDB.findIndex(user => user.id === userID)
    if(index !== -1){
        userDB[index].profile_image = imgUrl
        return userDB[index]
    }
    return false

}









// POST CREATED


const postsDB = [{
    "id": "5185e0a9-fb29-42c4-9799-0a91671dc5a0",
    "title": "Maximo 1",
    "content": "Esto es un post de Maximo",
    "header_image": "miimagen.png",
    "user_id": "e07fe448-b327-4aea-a131-7dc9300c8f56",
    "published": true
  },
  {
    "id": "18147cb5-e783-4dc3-b98a-7902ca9d5c5b",
    "title": "Julieth 2",
    "content": "Esto es un post de Julieth",
    "header_image": "unaimagencita.png",
    "user_id": "b22bd64e-1a72-4fba-b824-a0f20c2a9a6e",
    "published": true
  },
  {
    "id": "9a1f3496-4ed1-4cd8-975e-b910423ea35a",
    "title": "Matias 3",
    "content": "Esto es un post de Matias",
    "header_image": "dosanos.png",
    "user_id": "e4613411-6cda-4761-8337-333ffa6a4eac",
    "published": true
  }

]

  // CREATE POST
/*
   {
    "title": "Maximo 1",
    "content": "Esto es un post",
    "header_image": "ur.png",
    "user_id": "uuid",
    "published": true
    }
*/

const getAllPost = () => {
    return postsDB 
}

const getPostById = (id) => {
    const data = postsDB.filter(item => item.id === id)
    return data.length ? data[0] : false
} 




const createPost = (userId, data) =>  {
    const newPost = {
        id: uuid.v4(),
	    title: data.title,
	    content: data.content,
	    header_image: data.header_image,
	    user_id: userId,//Aqui hara referencia al usuario de tu postk
	    published: true
    }
    postsDB.push(newPost)
    return newPost
}


// const result = createPost({title: 'hola'})
// console.log(result)


const editPost = (id, data) => {
    const index = postsDB.findIndex(user => user.id === id)
    if(index !== -1){
        postsDB[index] = {
        id: uuid.v4(),
	    title: "string",
	    content:"string",
	    header_image: "url_to_img",
	    user_id: "uuid",//Aqui hara referencia al usuario de tu postk
	    published: true
        }
        return postsDB[index]
    }else {
        createPost(data)
    }
}






const deletePost = (id) => {
    const index = postsDB.findIndex(user => user.id === id)
    if (index !== -1){
        postsDB.splice(index, 1)
        return true
    } else {
        return false
    } 
    
}

const getUserPost = (user_id) =>  {
    const data = postsDB.filter(post => post.user_id === user_id)
    return data
}
const resul = getUserPost()
console.log(resul)



module.exports = {
    getUserPost,
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getPostByEmail,
    getAllPost,
   getPostById,
   createPost,
   editPost,
   deletePost,
   editProfileImg

}




```

    ///////////////////

# (users.http.js = Manejo de las solicitudes y las respuestas )

```js
    const userControllers = require('./users.controllers')



const getAll = (req, res) => {
    userControllers.getAllUsers()
    .then((response) => {
        res.status(200).json({ item: response.length, users: response })
    })
    .catch(err =>{ res.status(400).json(err)
    
    })
}

const getById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)

    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => res.status(400).json({ message: `El usuario ${id} no existe` }))


    // if (data) {
    //     res.status(200).json(data)
    // } else {
    //     res.status(404).json({ message: `El usuario ${id} no existe` })
    // }
}

// {
//     "id": 1,
//     "first_name": "Maximo",
//     "last_name": "Perea",
//     "email": "max@gmail.com", 
//     "password": "root123",
//     "phone": "987654321",
//     "birthday_date": "07/12/1990",
//     "rol": "normal",
//     "profile_image": "http://miimage.com",
//     "country": "Colombia", 
//     "is_active": true, 
//     "verified": false 
// }

const register = (req, res) => {
    const data = req.body
    if (!data) {
        return res.status(400).json({ message: 'Missing Data' })
    } 
    if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.birthday_date ||
        !data.country
    ) {
        return res.status(400).json({
            message: 'All Fields must be completed', fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                password: 'string',
                birthday_date: 'DD/MM/AAAA',
                country: 'string'
            }
        })
    }else {
      userControllers.createUser(data) 
      .then((response) => {
          res.status(201).json({ 
            message: ` User has been created succesfully with id: ${response.id}`,
            user: response,
             })
        })
        .catch(err => {
        res.status(400).json({err})
        })
    }
}



const remove = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
    .then((response) => {
        if (response){
            res.status(204).json()
        }else {
            res.status(400).json({message: 'Invalid ID'})
        }
    
    })
}



    const edit = (req, res) => {
        const id = req.params.id
        const data = req.body
      if (!Object.keys(data).length){
        return res.status(400).json({ message: 'Missing Data'})
      } else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.role ||
        !data.profile_image ||
        !data.birthday_date ||
        !data.country ||
        !data.is_active
        ) {
          return res.status(400).json({
            message: 'All Fields must be completed', fields: {
              first_name: 'string',
              last_name: 'string',
              email: 'example@example.com',
              phone: '+57321548848',
              role: 'normal',
              profile_image: 'imagen.com/img/example.png',
              birthday_date: 'DD/MM/AAAA',
              country: 'string',
              is_active: true
          }
      })
      } else {
        const response = userControllers.editUser(id, data)
        return res.status(200).json({ message: 'ID edited succesfully', user: response})
      }
    }

    const getMyUser = (req, res) => {
        const id = req.user.id
        const data = userControllers.getUserById(id)
        res.status(200).json(data)
    }

    const removeMyUser = (req, res) => {
        const id = req.user.id
        const data = userControllers.deleteUser(id)
        
        if(data){
            res.status(204).json()
        } else {
            res.status(400).json({ message: 'Invalid ID'})
        }
    }


    const ediMyUser = (req, res) => {
        const id = req.user.id
        const data = req.body
        if (!Object.keys(data).length){
            return res.status(400).json({ message: 'Missing Data'})
          } else if (
            !data.first_name ||
            !data.last_name ||
            !data.email ||
            !data.phone ||
            !data.profile_image ||
            !data.birthday_date ||
            !data.country ||
            !data.is_active
            ) {
              return res.status(400).json({
                message: 'All Fields must be completed', fields: {
                  first_name: 'string',
                  last_name: 'string',
                  email: 'example@example.com',
                  phone: '+57321548848',
                  role: 'normal',
                  profile_image: 'imagen.com/img/example.png',
                  birthday_date: 'DD/MM/AAAA',
                  country: 'string',
                  is_active: true
              }
          })
          } else {
            const response = userControllers.editUser(id, data)
            return res.status(200).json({
                 message: 'ID edited succesfully', user: response})
          }
    }

    
    const postProfileImg = (req, res) => {
        const userId = req.user.id

        const imgPath = req.hostname + ':5000' + '/api/v1/uploads/' + req.file.filename

        const data = userControllers.editProfileImg(userId, imgPath)
        res.status(200).json(data)
    }











    // SERVICIOS DE POST

    const getuserPost = (req, res) =>  {
        const userID = req.user.id
        const data = userControllers.getUserPost(userID)
        res.status(200).json(data)
    }
    

const postgetAll = (req, res) => {
    const data = userControllers.getAllPost()
    return res.status(200).json({item: data.length, users: data})
}

const postgetById = ( req, res) => {
    const id = req.params.id
    const data = userControllers.getPostById(id)
    if(data) {
        return res.status(200).json({message: 'ID getting succesfully', data})
    }else {
        return res.status(400).json({message: `The user ${id} not found`})
    }
}


// {
//      id: uuid.v4(),
// 	    title: "string",
// 	    content:"string",
// 	    header_image: "url_to_img",
// 	    user_id: "uuid",//Aqui hara referencia al usuario de tu postk
// 	    published: true,
//      password: hashPassword(data.password)
//  }


const postregister = (req, res) => {
    const userId = req.user.id
    const data = req.body
    
    
    if(!data){
        return res.status(400).json({message: 'Missing Data'})
    }
        if( 
            !data.title ||
            !data.content ||
            !data.published 
        ){
            return res.status(404).json({
            message: 'All fiels is not completed', 
            fiels: {
                title: "string",
                content:"string",
                header_image: "url_to_img",
                user_id: "uuid",
                published: true
                } 
            

            })

        }else {
            const response = userControllers.createPost(userId, data)
                return res.status(201).json(
                  {message: `Post: ${response.title} has been created`, user: response})   
                  
        } 
}



const postremove = (req, res) => {
  const id = req.params.id
  const data = userControllers.deletePost(id)
  
  if(data){
      return res.status(204).json()
  } else {
      return res.status(400).json({ message: 'Invalid ID'})
  }
}

  const postedit = (req, res) => {
      const id = req.params.id
      const data = req.body
    if (!Object.keys(data).length){
      return res.status(400).json({ message: 'Missing Data'})
    } else if( 
      !data.title ||
      !data.content ||
      !data.user_id ||
      !data.published
  ){
      return res.status(404).json({
      message: 'All fiels is not completed', 
      fiels: {
          title: "string",
          content:"string",
          header_image: "url_to_img",
          user_id: "uuid",
          published: true,
          } 
      

      })

  } else {
      const response = userControllers.editPost(id, data)
      return res.status(200).json({ message: 'ID edited succesfully', user: response})
    }
  }




module.exports ={
    getuserPost, 
  getAll,
  getById,
  register,
  remove,
  edit,
  ediMyUser,
  postgetAll,
  postgetById,
  postregister,
  postremove,
  postedit,
  removeMyUser,
  getMyUser,
  postProfileImg
}





```



# (users.router.js = Manejo de las rutas )
_____________________________________________________

```js

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

```







# 4 UTILS = Carpeta de herramientas (crypt.js = archivo para incriptar las contraseñas)
_____________________________________________________




Se define una carpeta para guardar las configuracion de contraseñas incriptadas

npm install bcrypt

     ```js
const bcrypt = require('bcrypt')    //importamos la libreria bcrypt

const hashPassword = (root) => {     // funcion para incriptar las contraseñas, con parametros las contraseña root
    return bcrypt.hashSync(root, 10)  // retornamos bcrypt con su metodo hashSync(le pasamos la contraseña, y la salt= que son las veces que se itera la contraseña) 
}

const comparePassword = (root, hashPassword) => {   // funcion para comparar la contraseña
    return bcrypt.compareSync(root, hashPassword)  // retornamos bcrypt con su metodo compareSync(le pasamos la contraseña, y hashPassword= que es la contraseña incritada (root))  
}

module.exports = {   // exportamos las funciones para usarlas en los controladores
    hashPassword,
    comparePassword
}
```

    ///////////////////

  # SEQUELIZE BASE DE DATOS

    npm install sequelize pg pg-hstore

    CARPETA utils - database.js

```js
    const {Sequelize} = require('sequelize')

    const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root2022',
    database: 'skeleton',
    port: 5432
    })

    module.exports ={
    db
    }
```

    ///////////////////

    # MULTER 

    npm install express multer

```js

    const multer = require('multer')
    const path = require('path')


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('uploads/'))
        },
        filename: (req, file, cb) => {
            cb(null,  'academlo' + Date.now() + '-' + file.originalname)
        }
        
    })

    const upload = multer({storage})

    exports.upload = upload 

```


/////////////////////

# 5 AUTH = Carpeta de archivos de autorizacion ( auth.controlles.js, auth.http.js, auth.router.js = archivo para autentificar a ususarios y rutas)


 (auth.controlles.js)

```js

const {getPostByEmail} = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypt')


const loginUser = (email, password) => {
    const user = getPostByEmail(email)
    //? user.password Contraseña hashada 
    //* password Contraseña en texto plano
    if(user){
        const verify_password = comparePassword(password, user.password)
        if (verify_password){
            return user
        }

    }
    return false
}

module.exports = {
    loginUser
}

```

    ///////////////////

    #auth.http.js

```js
const {loginUser} = require('./auth.controllers')

const jwt = require('jsonwebtoken')

const login = (req, res) => {
    const data = req.body

    if(!data.email || !data.password){
        return res.status(400).json({message: 'Missing Data'})
    }
    
    const response = loginUser(data.email,data.password)

    if(response) {

        const token = jwt.sign({
            id: response.id,
            email: response.email,
            rol: response.rol
        }, 'academlo' )

        return res.status(200).json({message: 'Tus credenciales son correctas', token})
    } else {
        return res.status(401).json({message: ' Invalid Credentials'})
    }

}

module.exports ={
    login
}

```
    /////////////////

    # auth.router.js

```js 
const router = require('express').Router()

const authServices = require('./auth.http')
const {register} = require('../users/users.http')


router.post('/login', authServices.login)
router.post('/register', register)

//* /api/v1/auth/login

exports.router = router

```





# 6 MIDDLEWARE = Carpeta PARA MANEJO DE TOKEN jwt ( auth.middleware.js,

    auth.middleware.js

```js

const { getUserById } = require("../users/users.controllers");

const JwtStrategy = require("passport-jwt").Strategy,
        ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo", // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            const data = getUserById(decoded.id)

            if (data){
                console.log("decoded jwt", decoded);
                return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
            }else {
                return done(null, false)
            }
        })
    );
};

```

///////////////////

 # AdminRole.js

```js 



    const rolAsminMiddleware = (req, res, next) => {
        
        const rol = req.user.rol
        if(rol === 'admin'){
            next()
        }else {
            res.status(400).json({status: 'error', message: 'User not authorized to make this request'})
        }
    }

    exports.rolAsminMiddleware = rolAsminMiddleware  


```

///////////////////


 # MIDDLEWARE EXPLICATION
 Passport (Solo para Login y para proteger rutas)

 Lo primero sera crear el servicio para poder hacer login y crear usuarios.
_____________________________________________________________________________
```
bash

npm install bcrypt
npm install passport-jwt
npm install passport
npm install jsonwebtoken
```

Lo siguiente seria implementar un endpoint para poder hacer login que el objetivo es que retorne un token como respuesta.

En esta peticion recibiriamos las credenciales del usuario

```jsx
app.post('/login', (req, res) => {
	// Aqui comprobamos las credenciales del usuario y retornamos el token en caso de ser exitoso
	res.status(201).json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoicm9vdDEyMyJ9.NvfPbDJmhnBdlFi1cEuQPkLhDnvCqjANuQ-QGGvCBr4'})
})
```
    /////////////////

Lo siguiente va a ser crear un archivo:

```jsx
const JwtStrategy = require("passport-jwt").Strategy,
        ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(),
        secretOrKey: "palabra-secreta" // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            console.log("decoded jwt", decoded);
            return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
        })
    );
};
```

## Ahora una vez que implementamos esto, como protegemos los endpoints/ Rutas?

Estas protecciones nos van a servir para que la informacion varie dependiendo el usuario que esta identificado.

```jsx
app.get('/todos', passport.authenticate('jwt', {session: false}), (req, res) => {
	res.status(200).json({
		message: "Tienes autorizacion para entrar aqui"
	})
})
```
    /////////////////
 Ejemplo de login

Usuario:

email: admin@admin.com

password: root

## Como cifrar las contraseñas de nuestros usuarios?

en este caso vamos a utilizar la libreria de bcrypt

al crear un usuario nosotros vamos a pasar las contraseñas de la siguiente manera:

```jsx
const bcrypt = require("bcrypt")

const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, 10)
}
```

Ahora, para comprobar que el usuario esta mandando y ver si es correcta, hacemos lo inverso

```jsx
const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done)
}
```

Solo falta crear un nuevo controlador que nos comparara las contraseñas 

```jsx
const checkUserCredentials = (username, password) => {
        let user = await getuserIdFromUserName(username);
        if (user) {
            //Check if the credentials are correct
            crypto.comparePassword(password, user.password, (err, result) => {
	          try{
							return result
						} catch (err){
							console.error(err)
						}   
            });
        } else {
            reject(err);
        }
    });
};
```


///////////////////




# BCRYPT 
    npm install bcrypt
```JS
const bcrypt = require('bcrypt')    //importamos la libreria bcrypt

const hashPassword = (root) => {     // funcion para incriptar las contraseñas, con parametros las contraseña root
    return bcrypt.hashSync(root, 10)  // retornamos bcrypt con su metodo hashSync(le pasamos la contraseña, y la salt= que son las veces que se itera la contraseña) 
}

const comparePassword = (root, hashPassword) => {   // funcion para comparar la contraseña
    return bcrypt.compareSync(root, hashPassword)  // retornamos bcrypt con su metodo compareSync(le pasamos la contraseña, y hashPassword= que es la contraseña incritada (root))  
}

module.exports = {   // exportamos las funciones para usarlas en los controladores
    hashPassword,
    comparePassword
}
```

///////////////////

# TESTING 


UNIT.TEST.JS 

    npm i -D mocha chai chai-http


```js
const { assert } = require("chai")
const {it, describe } = require("mocha")


const userControllers = require('../users.controllers')

// ruta en terminar .\node_modules\.bin\mocha ./src/users/test/unit.test.js       



describe('Test  unitario de mis usuarios', () => {
    
    it( 'Should return new user when I send correct data', (done) => {
        const body = {
            
            first_name: "maximo", 
            last_name: "Tester", 
            email: "dataemail.com", 
            password: "123456",   
            phone: 3214987,
            birthday_date:"10/01/2000",
            country: "datacountry",
        }
        const data = userControllers.createUser(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })
    it( 'Should return new user when I sent correcto data', (done) => {
        const body = {
            
            first_name: "Usuario de test", 
            last_name: "Tester", 
            email: "dataemail.com", 
            password: "123456",   
            phone: "321654987",
            birthday_date:"10/01/2000",
            country: "datacountry",
            profile_image: 'asd'

        }
        const data = userControllers.createUser(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, 'asd')
        done()
    })
})


```

///////////////////


INTEGRATION.TEST.JS

    npm i -D mocha chai chai-http

    ```js

const chai = require("chai")
const {it, describe} = require("mocha")
const chaiHttp = require('chai-http')


const app = require('../../app')
//ruta para testing en terminarl   .\node_modules\.bin\mocha ./src/users/test/integration.test.js


chai.use(chaiHttp)

describe('Suite de test de integracion de Usuarios', () => {
    
    it( 'Should return 204 when I delete my own user with my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwN2ZlNDQ4LWIzMjctNGFlYS1hMTMxLTdkYzkzMDBjOGY1NiIsImVtYWlsIjoibWF4aTAxQGV4YW1wbGUuY29tIiwicm9sIjoibm9ybWFsIiwiaWF0IjoxNjYyOTQ0OTg4fQ.-WA1xkFpf8k7J7Zjn2dyvpq-pQvCe3uQqxUK175M4ps')
            .end((err, res) => {
                chai.assert.equal(res.status, 204)
                done()
            })

    })
})

 ```


    ///////////////////

# CARPETA models 

    CARPETA models - initModel.js
```js
    const User = require('./user.model')
const Posts = require('./posts.model')


const iniModels = () => {
    User.hasMany(Posts)  // User has many posts
    Posts.belongsTo(User)  // Posts belongs to user
}

module.exports = iniModels
    
```

    ///////////////////

   models - user.model.js
```js
  /*
    {
    "id": "e07fe448-b327-4aea-a131-7dc9300c8f56",
    "first_name": "Maximo 1",
    "last_name": "Perea",
    "email": "maxi01@example.com",
    "password": "$2b$10$mTGU0Suc0YrwVfZcvEo83OLxgR5vP8Meea6IV3i9wf29dvmYgPuGS", //? root
    "phone": "+57321548848",
    "birthday_date": "07/12/1990",
    "rol": "normal",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
  }
*/

const { DataTypes } = require('sequelize')

const {db} = require('../utils/database')

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allownull: false,
    },
    first_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
        
    },
    birthday_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        dafaulValue: 'normal',
    },
    profile_image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    // status: {
    //     allowNull: false,
    //     type: DataTypes.STRING,
    //     defaultValue: 'active // non-active, deleted, suspendef'
    // },
    is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValues: true
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValues: false

    }
})

module.exports = Users

``` 

    ///////////////////

  models - posts.model.js
```js
    /*
    {
    "id": "e07fe448-b327-4aea-a131-7dc9300c8f56",
    "first_name": "Maximo 1",
    "last_name": "Perea",
    "email": "maxi01@example.com",
    "password": "$2b$10$mTGU0Suc0YrwVfZcvEo83OLxgR5vP8Meea6IV3i9wf29dvmYgPuGS", //? root
    "phone": "+57321548848",
    "birthday_date": "07/12/1990",
    "rol": "normal",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
  }
*/

const { DataTypes } = reequire('sequelize')

const {db} = require('../utils/database')

const Posts = db.define('posts', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allownull: false,
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active",
    },   
})
module.exports = Posts


```


    /////////////////

 #CARPETA uploads

```js

Archivos png

```



///////////////////

Archivo .env

```js
PORT = 8000
HOST = 'localhost'
PASSPORT = 'root2022'

```