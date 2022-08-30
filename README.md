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
 users
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

# Dependencias de Authorizacion
    npm i jsonwebtoken

# Dependencias para Login
    npm i passport-jwt
    npm i passport
    npm i jsonwebtoken




# 2 SRC = Carpeta general ( app.js = Creacion del servidor y el puerto y demas configuracions) 

    # app.js

    ```js
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
    const authRouter = require('./auth/auth.router').router

    app.use('/api/v1/users', userRouter)
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


const userDB = [{
    "id": "ac3c109b-ea85-4a3b-9f6b-33112676354a",
    "first_name": "Maximo 2",
    "last_name": "Amaya",
    "email": "Juliac@example.com",
    "password": "$2b$10$lxndLaVIZwTLNCUNjiMTOuCy4Ycj3/UwtNPKb9SeDMSinUfM828ey",
    "phone": "+57321548848",
    "birthday_date": "08/11/1994",
    "rol": "normal",
    "profile_image": "imagen.com/img/example.png",
    "country": "Colombia",
    "is_active": true,
    "verified": false
  },
  { 
  "id": "953243ea-cfb2-4a25-9392-54c5351e8bdf",
  "first_name": "Maxxx 1",
  "last_name": "Perea",
  "email": "Juliac@example.com",
  "password": "$2b$10$hV8/hFLIWrkO7QM5mWNq8OMiCC.X.rMRUoN3WT6eZcfwg6rVgl3Hm",
  "phone": "+57321548848",
  "birthday_date": "08/11/1994",
  "rol": "normal",
  "profile_image": "imagen.com/img/example.png",
  "country": "Colombia",
  "is_active": true,
  "verified": false
    }
]


//GET
const getAllUsers = () => {
    return userDB
    //? select * from users;
}


//GET/:id
const getUserById = (id)=> {
    const data = userDB.filter((item) => item.id === id)
    return data.length ? data[0] : false
    //? select * from users where id = ${id};
}



//POST
const createUser = (data) => {
    const newUser = {
        id: uuid.v4(), //obligatorio y unico
        first_name: data.first_name, //obligatorio
        last_name: data.last_name, //obligatorio
        email: data.email, //obligatorio y unico
        password: hashPassword(data.password),   //obligatorio
        phone: data.phone ?  data.phone : '',
        birthday_date: data.birthday_date,  //obligatorio
        rol: 'normal',   //obligatorio y por defecto "normal"
        profile_image: data.profile_image ? data.profile_image : '',
        country: data.country, //obligatorio
        is_active: true,  //obligatorio y por defecto true
        verified: false //obligatorio y por defecto false
    }
    userDB.push(newUser)
    return newUser
}



//PUT
const editUser = (id, data) => {
    const index = userDB.findIndex(user => user.id === id)
    if (index !== -1){
        userDB[index] ={
            id: id,
            first_name: data.first_name, 
            last_name: data.last_name,
            email: data.email, 
            password: userDB[index].password,
            phone: data.phone,
            birthday_date: data.birthday_date,
            rol: 'normal',
            profile_image: data.profile_image,
            country: data.country, 
            is_active: true, 
            verified: false
        } 
        return userDB[index]
    }else {
        return createUser(data)
    }
}

//DELETE/:id
const deleteUser = (id) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1 ){
        userDB.splice(index, 1)
        return true
    }else {
        return false
    }
}

//COMPARE PASSWORD 

const getPostByEmail = (email) => {
    const data = userDB.filter(item => item.email === email)
    return data.length ? data[0] : false
} 

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getPostByEmail
}


```


# (users.http.js = Manejo de las solicitudes y las respuestas )

```js
    const userControllers = require('./users.controllers')

    const getAll = (req, res) => {
        const data = userControllers.getAllUsers()
        res.status(200).json({ item: data.length, users: data })
    }

    const getById = (req, res) => {
        const id = req.params.id
        const data = userControllers.getUserById(id)

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `El usuario ${id} no existe` })
        }
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
        const response = userControllers.createUser(data) 
        return res.status(201).json(
            {message: ` User: ${response.first_name} has been created succesfully`, user: response})
        }
    }

    const remove = (req, res) => {
        const id = req.params.id
        const data = userControllers.deleteUser(id)
        
        if(data){
            return res.status(204).json()
        } else {
            return res.status(400).json({ message: 'Invalid ID'})
        }
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
            !data.rol ||
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
                password: 'string',
                phone: '+57321548848',
                rol: 'normal',
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
                    rol: 'normal',
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


    module.exports ={
    getAll,
    getById,
    register,
    remove,
    edit,
    ediMyUser
    }

```



# (users.router.js = Manejo de las rutas )
_____________________________________________________

```js

const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)


const userServices = require('./users.http')


router.route('/')   //* /api/v1/users/
    .get(userServices.getAll)
    .post(userServices.register)

router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.ediMyUser)

    
router.route('/:id')  //* /api/v1/users/:id
    .get(userServices.getById)
    .put(userServices.edit)
    .delete(userServices.remove)



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

#  auth.http.js

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

# auth.router.js

```js 
const router = require('express').Router()

const authServices = require('./auth.http')

router.post('/login', authServices.login)


exports.router = router

```





# 6 MIDDLEWARE = Carpeta PARA MANEJO DE TOKEN jwt ( auth.middleware.js,

    auth.middleware.js

```js

const JwtStrategy = require("passport-jwt").Strategy,
        ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo", // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            console.log("decoded jwt", decoded);
            return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
        })
    );
};

```






# Autenticacion VS Autorizacion 
________________________________
# MIDDLEWARE 
 Passport (Solo para Login y para proteger rutas)

## Lo primero sera crear el servicio para poder hacer login y crear usuarios.
_____________________________________________________________________________
```bash

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

# Ejemplo de login

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

hola-Grupo






