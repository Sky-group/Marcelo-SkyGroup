const assert = require('assert');
const api = require('./../api');

let ap = {};

describe('Suite de teste API Herois', function (){
    this.beforeAll(async () =>{
        app = await api;
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
})