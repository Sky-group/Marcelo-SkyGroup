const { deepEqual, ok} = require('assert');
const database = require('./database');


const DEFULT_ITEM_CADASTRADO = {
    nome:  'Flash',
    poder: 'Speed',
    id: 1601595513869
}

const DEFULT_ITEM_ATUALIZAR = {
    nome:  'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}
describe('Suite de manipulação de heroi', ()=>{

 /*   before(async ()=>{
        await database.cadastrar(DEFULT_ITEM_CADASTRADO);
        await database.cadastrar(DEFULT_ITEM_ATUALIZAR);
    });
*/
    it('Deve pesquisaar um heroi, utilizando arquivos', async ()=>{
        const expected = DEFULT_ITEM_CADASTRADO;
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi,utilizando arquivos' ,async()=>{
        const expected = DEFULT_ITEM_CADASTRADO;
        const resposta = await database.cadastrar(DEFULT_ITEM_CADASTRADO);
        const [actual] = await database.listar(DEFULT_ITEM_CADASTRADO.id);
        deepEqual(actual,expected)
    })

    it.only('Deve remover um heroi do arquivo', async ()=>{
        const expected = true; 
        const resultado = await database.remover(DEFULT_ITEM_CADASTRADO.id);
        deepEqual(resultado, expected)
    })

    it('Deve atualizar um heroi pelo id', async ()=>{
        const expected = {
            ...DEFULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await database.atualizar(DEFULT_ITEM_ATUALIZAR.id, novoDado);
        const [resultado] = await database.listar(DEFULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected);
    })

})