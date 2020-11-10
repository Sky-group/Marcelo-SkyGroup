const assert = require('assert');
const Postgres = require('./../db/strategies/postgres/postegre');
const HeroisSchema = require('./../db/strategies/postgres/schemas/heroisSchema')
const Context = require('./../db/strategies/base/contextStrategy')

let context =  {};
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
    this.beforeAll(async () =>{
      const connection = await Postgres.connected();
      const model = await Postgres.defineModel(connection, HeroisSchema);
      context = new Context(new Postgres(connection, model));
      await context.delete();
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

    it('Teste Deletar', async function(){
        const [item] = await context.read({})
        const result = await context.delete(item.id);
        assert.deepStrictEqual(result,1);
    })

})