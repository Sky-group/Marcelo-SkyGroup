const assert = require('assert');
const MongoDb = require('./../db/strategies/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');
const { deepStrictEqual } = require('assert');

const context = new Context(new MongoDb);

describe('MongoDb suite de teste',function(){
    this.beforeAll(async () => {
        await context.connected()
    })

    it('Testando conexão', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';
        deepStrictEqual(result, expected);
    })
})