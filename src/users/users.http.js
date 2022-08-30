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
  postedit
}



