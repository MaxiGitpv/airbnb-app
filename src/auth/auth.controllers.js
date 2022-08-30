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