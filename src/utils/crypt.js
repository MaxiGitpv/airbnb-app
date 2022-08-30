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