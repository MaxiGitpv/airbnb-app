const { assert } = require("chai")
const {it, describe } = require("mocha")


const userControllers = require('../users.controllers')

// ruta en terminar .\node_modules\.bin\mocha ./src/users/test/unit.test.js       



describe('Test  unitario de mis usuarios', () => {
    
    it( 'Should return new user when I send correct data', (done) => {
        const body = {
            
            first_name: "maximo", 
            last_name: "Tester", 
            email: "dataemail.com", 
            password: "123456",   
            phone: 3214987,
            birthday_date:"10/01/2000",
            country: "datacountry",
        }
        const data = userControllers.createUser(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })
    it( 'Should return new user when I sent correcto data', (done) => {
        const body = {
            
            first_name: "Usuario de test", 
            last_name: "Tester", 
            email: "dataemail.com", 
            password: "123456",   
            phone: "321654987",
            birthday_date:"10/01/2000",
            country: "datacountry",
            profile_image: 'asd'

        }
        const data = userControllers.createUser(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, 'asd')
        done()
    })
})


