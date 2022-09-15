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

