const chai = require("chai")
const {it, describe} = require("mocha")
const chaiHttp = require('chai-http')


const app = require('../../app')
//ruta para testing en terminarl   .\node_modules\.bin\mocha ./src/users/test/integration.test.js


chai.use(chaiHttp)

describe('Suite de test de integracion de Usuarios', () => {
    
    it( 'Should return 200 when I sent a correct ID in params', (done) => {
        chai.request(app)
            .get('/api/v1/users/e07fe448-b327-4aea-a131-7dc9300c8f56')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwN2ZlNDQ4LWIzMjctNGFlYS1hMTMxLTdkYzkzMDBjOGY1NiIsImVtYWlsIjoibWF4aTAxQGV4YW1wbGUuY29tIiwicm9sIjoibm9ybWFsIiwiaWF0IjoxNjYyOTQ0OTg4fQ.-WA1xkFpf8k7J7Zjn2dyvpq-pQvCe3uQqxUK175M4ps')
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.property(res.body, 'id')
                chai.assert.property(res.body, 'email')
                done()
            })

    })
})

describe('Suite de test de integracion de Usuarios', () => {
    
    it( 'Should return 204 when I delete my own user with my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwN2ZlNDQ4LWIzMjctNGFlYS1hMTMxLTdkYzkzMDBjOGY1NiIsImVtYWlsIjoibWF4aTAxQGV4YW1wbGUuY29tIiwicm9sIjoibm9ybWFsIiwiaWF0IjoxNjYyOTQ0OTg4fQ.-WA1xkFpf8k7J7Zjn2dyvpq-pQvCe3uQqxUK175M4ps')
            .end((err, res) => {
                chai.assert.equal(res.status, 204)
                done()
            })

    })
})
