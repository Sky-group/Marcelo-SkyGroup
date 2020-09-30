const { deepEqual, ok} = require('assert');
const database = require('./database');


const DEFULT_ITEM_CADASTRADO = {
    nome:  'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de heroi', ()=>{

    before(async ()=>{
        await database.cadastrar(DEFULT_ITEM_CADASTRADO);
    });

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

    it('Deve remover um heroi do arquivo', async ()=>{
        const expected = true; 
        const resultado = await database.remover(DEFULT_ITEM_CADASTRADO.id);
        deepEqual(resultado, expected)
    })

})