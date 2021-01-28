const assert = require('assert');
const api = require('./../api');

let ap = {};

const  MOCK_HEROI_CADASTRAR ={
    name: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    name: 'Gaviao Negro',
    poder: 'A Mira'
}

let MOCK_ID = ''
describe('Suite de teste API Herois', function (){
    this.beforeAll(async () =>{
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('Lista /herois', async () =>{
        const result  = await  app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=1000'
        })

        const dados = JSON.parse(result.payload);
        const statusCode =  result.statusCode;
       
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    })

    it('listar 10 herois', async()=>{

        const TAMANHO_LIMIT = 3;
        
        const result = await app.inject({
            method:'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })


        const dados = JSON.parse(result.payload);
        const statusCode =  result.statusCode;
       
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMIT);


    })

    it('Passando um valor invalido para o limit', async()=>{

        const TAMANHO_LIMIT = 'AAAA';
        
        const result = await app.inject({
            method:'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const erroStatus = {"statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]}};
        
      
        assert.deepStrictEqual(result.statusCode, 400)
        assert.deepStrictEqual(result.payload, JSON.stringify(erroStatus))
        
        


    })

    it('Lista filtrando nome', async()=>{

        
        const NAME = 'Aquaman';
        const result = await app.inject({
            method:'GET',
            url: `/herois?skip=0&limit=1000&name=${NAME}`
        })


        const dados = JSON.parse(result.payload);
        const statusCode =  result.statusCode;
        assert.deepStrictEqual(statusCode, 200)
        assert.deepStrictEqual(dados[0].name,NAME)
        


    })

    it('cadastrar POST - /herois', async() =>{
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR
        })

        const statusCode = result.statusCode
        const {message, _id} = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notDeepStrictEqual(_id, undefined)
        assert.deepStrictEqual(message, "Heroi cadastrado com sucesso!")
    })


    it('atualizar PATCH - /herois/:id', async()=>{
        const _id = MOCK_ID

        const expected = {
            poder : 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })
        
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message,'Heroi atualizado com sucesso!')
    })

    it('atualizar PATCH - /herois/:id  - não atualiza com id incorreto', async()=>{
        const _id = '60121fcd48bb29228eafca1a'

        const expected = {
            poder : 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })
        
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message,'Não foi possivel atualizar!')
    })
})