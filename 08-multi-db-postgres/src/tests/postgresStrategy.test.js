const assert = require('assert');
const Postgres = require('./../db/strategies/postegre');
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres());
const MOCHA_HEROI_CADASTRAR ={
    nome: 'Politico',
    poder: 'Desviar dinheiro'
};

const MOCHA_HEROI_ATUALIZAR ={
    nome: 'Batman',
    poder: 'Dinheiro'
};


describe('Postgres Strategy', function(){
    this.timeout(Infinity);
    this.beforeAll(async function(){
      await context.connect();
      await context.create(MOCHA_HEROI_ATUALIZAR);
    })

    it('Postgres Conection', async function(){
        const result = await context.isConnected();
        assert.strictEqual(result, true);
    })

    it('Teste cadastrar',async function(){
        const result = await context.create(MOCHA_HEROI_CADASTRAR);
        delete result.id;
        assert.deepStrictEqual(result, MOCHA_HEROI_CADASTRAR);
    })

    it('Teste Listar', async function(){
        const [result] = await context.read({nome : MOCHA_HEROI_CADASTRAR.nome});
        
        delete result.id;
        assert.deepStrictEqual(result, MOCHA_HEROI_CADASTRAR);
    })

    it('Teste Atualizar', async function(){
        console.log('nome', MOCHA_HEROI_ATUALIZAR.nome);
        const [itemAtualizar] = await context.read({nome : MOCHA_HEROI_ATUALIZAR.nome});
       
        const novoItem ={
            ...MOCHA_HEROI_ATUALIZAR,
            nome:'Mulher Maravilha'
        }
        
        const [result] = await context.update(itemAtualizar.id,novoItem);
        const [itemAtualizado] = await context.read({id : itemAtualizar.id});
        assert.deepStrictEqual(result, 1);
        assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome);
       
       
        /*
         No javaScript temos uma técnica chamada rest/spread que é um método usado para mergear objetos 
         ou separá-los
         {
             nome: 'Batman',
             poder: 'Dinheiro'
         }
         {
             dataNascimento: '1979-05-16'
         }

         final ficari
         {
             nome: 'Batman',
             poder: 'Dinheiro',
             dataNascimento: '1979-05-16'
         }
          
         */
    })

})