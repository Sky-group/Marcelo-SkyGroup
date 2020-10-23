const assert = require('assert');
const Postgres = require('./../db/strategies/postegre');
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres());
const MOCHA_HEROI_CADASTRAR ={
    nome: 'Politico',
    poder: 'Desviar dinheiro'
};


describe('Postgres Strategy', function(){
    this.timeout(Infinity);
    this.beforeAll(async function(){
      await context.connect();
    })

    it('Postgres Conection', async function(){
        const result = await context.isConnected();
        assert.equal(result, true);
    })

    it('Teste cadastrar',async function(){
        const result = await context.create(MOCHA_HEROI_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCHA_HEROI_CADASTRAR);
    })

})