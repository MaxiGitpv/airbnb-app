const  {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const Roles = db.define('roles', {
    id: {
        type: DataTypes.UUID,
        primaryKeys: true,
        allowNull: false
    },
    name: {
        types: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = Roles