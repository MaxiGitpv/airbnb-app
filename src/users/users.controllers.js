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
const createUser = async(data) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        firstName: data.first_name, 
        lastName: data.last_name, 
        email: data.email, 
        password: hashPassword(data.password),   
        phone: data.phone,
        birthdayDate: data.birthday_date,  
        role: "normal",  
        profileImage: data.profile_image,
        country: data.country, 
        status: 'active', 
        verified: false, 
    })
    return newUser
}


// controlador con siquelize

// const createUser = async (data) => {
//     const newUser = await Users.create({
//         ...data,
//         id: uuid.v4(),
//         password: hashPassword(data.password),   
//         role: "normalitoMijo",  
//         is_active: true, 
//         verified: true 
//     })
//     return newUser
// }








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

