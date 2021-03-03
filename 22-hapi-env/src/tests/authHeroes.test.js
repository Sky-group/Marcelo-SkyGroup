const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postegre')
const UsuarioSchema = require ('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {};
const USER = {
    username: 'Xuxadasilva',
    password: '123'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$2Q.pWrVwJTB5Am59ZMEwKu866yMysfusp3aQKiagX6FvMmLsUBhom'
}
describe('Auth test suite', function(){
    this.beforeAll(async ()=>{
        app = await api

        const connetionPostgres = await Postgres.connected()
        const model = await Postgres.defineModel(connetionPostgres,UsuarioSchema)
        const postgres = new Context(new Postgres(connetionPostgres, model))
        
        await postgres.update(null, USER_DB,true)

    })

    it('Deve receber um token', async ()=>{
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)

    })

    it('Deve retornar não autorizado ao tentar obter um login errado', async ()=>{
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: {
                username:'MarceloCardoso',
                password: '123'
            }
            
        }) 

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepStrictEqual(statusCode,401)
        assert.deepStrictEqual(dados.error, "Unauthorized")

    })
})