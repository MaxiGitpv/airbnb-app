
const dataDB = [
    {
        id: 1,
        name: 'Genobeba',
        phone: 3245454552
    }
]



const getbyId = (id) => {
    const data = dataDB.filter(item => item.id === id )
    return data
}




  const resul = getbyId({id: 1, name: 'max'})
  console.log(resul)

  
