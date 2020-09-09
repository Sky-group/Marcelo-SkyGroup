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


main();
async function main(){

try {
     
    const resultadoSoma =  await soma(8,9);
    const resultadoMult = await mutilplicaAsync( resultadoSoma, resultadoSoma);
    const resultadoDivi = await divideAsync(resultadoMult);
    console.log(`
           Somatorio: ${resultadoSoma},
           Multiplicação: ${resultadoMult},
           Divisao : ${resultadoDivi}
    `);

} catch (error) {
    console.log('Deu erro na parada', error);
}

}