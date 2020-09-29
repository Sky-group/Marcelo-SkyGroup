const {obeterPessoas} = require('./service');
const assert = require('assert');
const nock = require('nock');

describe('Teste grupo sky', ()=>{

     beforeEach(()=>{
        const resposta = {
            count: 1,
            next: null,
            previous: null,
            results: [
              {
                name: 'R2-D2',
                height: '96',
                mass: '32',
                hair_color: 'n/a',
                skin_color: 'white, blue',
                eye_color: 'red',
                birth_year: '33BBY',
                gender: 'n/a',
                homeworld: 'http://swapi.dev/api/planets/8/',
                vehicles: [],
                starships: [],
                created: '2014-12-10T15:11:50.376000Z',
                edited: '2014-12-20T21:17:50.311000Z',
                url: 'http://swapi.dev/api/people/3/'
              }
            ]
          };

          const resposta2 = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                name: 'Chewbacca',
                height: '228',
                mass: '112',
                hair_color: 'brown',
                skin_color: 'unknown',
                eye_color: 'blue',
                birth_year: '200BBY',
                gender: 'male',
                homeworld: 'http://swapi.dev/api/planets/14/',
                created: '2014-12-10T16:42:45.066000Z',
                edited: '2014-12-20T21:17:50.332000Z',
                url: 'http://swapi.dev/api/people/13/'
                }
            ]
         }
          nock(`https://swapi.dev/api/people`)
          .get(`/?search=r2-d2&format=json`)
          .reply(200,resposta);

          nock(`https://swapi.dev/api/people`)
          .get(`/?search=Chewbacca&format=json`)
          .reply(200,resposta2);
    })

    it('comparar estrutura de dados', async()=>{
        const esperado = [{
            nome: 'R2-D2',
            peso: '96'
        }];
        const nomeBase = 'r2-d2';
        const recebido = await obeterPessoas(nomeBase);
        assert.deepStrictEqual(recebido, esperado);


    })

    it('retornar chewbbacca', async ()=>{

        const esperado = [{
            nome: 'Chewbacca',
            peso :'228',
            cor_cabelo:'brown',
            cor_olhos: 'blue'
        }];

        const nameBase = 'Chewbacca';
        const recebido = await obeterPessoas(nameBase);
        assert.deepStrictEqual(recebido, esperado);
    })

})