const assert = require('assert');
const MongoDb = require('./../db/strategies/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');
const { deepStrictEqual } = require('assert');
const { moveCursor } = require('readline');

const context = new Context(new MongoDb);

const MOCHA_HEROI_CADASTRAR = {
    name: 'Aquaman',
    poder: 'Falar com animais marinhos'
};

describe('MongoDb suite de teste',function(){
    this.beforeAll(async () => {
        await context.connected()
    })

    it('Testando conexão', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';
        deepStrictEqual(result, expected);
    })

    it('Testando a criação de herois', async ()=>{
       
        const { name, poder} = await context.create(MOCHA_HEROI_CADASTRAR);
        assert.deepStrictEqual({name, poder}, MOCHA_HEROI_CADASTRAR);
    })
})