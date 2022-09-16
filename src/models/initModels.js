const Users = require('./user.model')
const User_image = require('./user_image.model')
const Roles = require('./roles.model')
const Accommodations = require('./accommodations.model')
const Accommodations_images = require('./accommodations_image.model')
const Places = require('./places.model')
const Reservations = require('./reservations.model')



const iniModels = () => {

    //? belongsTo => 
    //? belongsToMany => 
    //? hasOne =>
    //? hasMany =>

    Users.hasOne(Roles)  // User has many Roles
    Roles.belongsToMany(Users)

    //? ManyTO >-< Many
    Users.belongsToMany(Accommodations, {through: Reservations})
    Accommodations.belongsToMany(Users, {through: Reservations})


}

module.exports = iniModels