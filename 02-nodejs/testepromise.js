
const util = require('util');
const mutilplicaAsync = util.promisify(multiplica);
const divideAsync = util.promisify(divide);

function soma(x,y){
    return new Promise( function (resolve, reject){

        setTimeout(() => {
                return resolve (x + y);
        }, 100);
    })
}


/*
function multiplica(a, b){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            return resolve( a * b);
        }, 2000);

    });
}
*/
function multiplica(a, b, callback){

    setTimeout(() => {
        return callback(null, a * b);
    }, 2000);
}

function divide (x, callback){

    setTimeout(() => {
        return callback(null, x/2);
    }, 3000);
}


const somapromise = soma(2,3);

somapromise
.then(function (soma){
    const mult = mutilplicaAsync(soma, soma);
    return mult.then( function resolveMultiplica(result){
        return {
            soma,
            multiplicacao :result
        }
    })
})
.then( function (resultado){
    const divid = divideAsync(resultado.multiplicacao);
    return divid.then( function resolveDivisao(result){
        return {
            soma: resultado.soma,
            multiplicacao: resultado.multiplicacao,
            divisao :result
        }
    })
})
.then(function (resultado){
    console.log(`
        Soma = ${resultado.soma},
        Multiplicação = ${resultado.multiplicacao},
        Divisão = ${resultado.divisao}
    `);
})
.catch( function(erro){
    console.log('Deu erro', erro);
})
/*
.then(function(soma){
    return multiplica(soma, soma)
    .then( function resolverMultiplica(multiplicacao){
        return  {
            
            soma,
            multiplicacao
            
        }
    })
})
.then( function ( resultado){
    const divid = divideAsync(resultado.multiplicacao);
    return divid.then( function resolverEndereco(result){
        return {
            soma: resultado.soma,
            multiplicacao: resultado.multiplicacao,
            divisao: result
        }
    })
})
.then (function (resultado){
    console.log(`
        Soma: ${resultado.soma},
        Multiplicação: ${resultado.multiplicacao},
        Divisão: ${resultado.divisao}
    `);
   
})
.catch(function (erro){
    console.log('Deu algo errado',erro)
})

*/