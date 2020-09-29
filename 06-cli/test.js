const { deepEqual, ok} = require('assert');
const database = require('./database');


const DEFULT_ITEM_CADASTRADO = {
    nome:  'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de heroi', ()=>{

    it('Deve pesquisaar um heroi, utilizando arquivos', async ()=>{
        const expected = DEFULT_ITEM_CADASTRADO;
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })

   /* it('deve cadastrar um heroi,utilizando arquivos' ,async()=>{
        const expected = DEFULT_ITEM_CADASTRADO;

        ok(null,expected)
    })*/

})