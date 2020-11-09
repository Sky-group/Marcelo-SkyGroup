const assert = require('assert');
const MongoDb = require('./../db/strategies/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');
//const { deepStrictEqual } = require('assert');
//const { moveCursor } = require('readline');

const context = new Context(new MongoDb);

const MOCHA_HEROI_CADASTRAR = {
    name: 'Aquaman',
    poder: 'Falar com animais marinhos'
};

const MOCHA_HEROI_ATUALIZAR = {
    name: 'Perninha',
    poder: 'Cenoura'
};

let ID_HEROI_ATUALIZAR = '';

describe('MongoDb suite de teste',function(){
    this.beforeAll(async () => {
        await context.connected();
        const resultado = await context.create(MOCHA_HEROI_ATUALIZAR);
        ID_HEROI_ATUALIZAR = resultado._id;

    })

    it('Testando conexão', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';
        assert.deepStrictEqual(result, expected);
    })

    it('Testando a criação de herois', async ()=>{
       
        const { name, poder} = await context.create(MOCHA_HEROI_CADASTRAR);
        assert.deepStrictEqual({name, poder}, MOCHA_HEROI_CADASTRAR);
    })

    it('Testando o listar', async () =>{
        const[{name,poder}] = await context.read({name:MOCHA_HEROI_CADASTRAR.name});
        const result = {
            name,
            poder
        }

        assert.deepStrictEqual(result, MOCHA_HEROI_CADASTRAR);
    })

    it('Teste Atualizar', async () =>{
        const result = await context.update(ID_HEROI_ATUALIZAR, {
            name: 'Pernalonga'
        })

        assert.deepStrictEqual(result.nModified, 1);
    })

    it( 'Testando Delete', async () =>{
       
        const result = await context.delete(ID_HEROI_ATUALIZAR);
        assert.deepStrictEqual(result.n,1);
    })
})