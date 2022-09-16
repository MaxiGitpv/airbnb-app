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
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    }, 
    gender: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    dni: {
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
    birthdayDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'birthday_date'
    },
    role: {
        allowNull: false,
        type: DataTypes.UUID
    },
    address: {
        type: DataTypes.STRING
    },
    profileImage: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active' // non-active, deleted, suspendef'
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValues: false

    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
    }
})

module.exports = Users

