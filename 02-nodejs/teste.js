
function soma(x,y, callback){
    setTimeout(() => {
            return callback (null,x + y);
    }, 100);
}


function multplica(a, b, callback){

    setTimeout(() => {
        return callback(null, a * b);
    }, 2000);
}

function divide (x, callback){

    setTimeout(() => {
        return callback(null, x/2);
    }, 3000);
}


soma(3, 5,function resolverSoma(erro, soma){
    
    if(erro){
        console.log('Deu erro em soma', erro);
        return;
    }

   multplica(soma,soma, function resolveMultiplicacao(erro2, multiplicacao){

    if(erro2){
        console.log('Deu erro na multiplicação', erro2);
        return;
    }
     divide(multiplicacao, function resolveDivisao(erro3, divisao){
         if(erro3){
             console.log('Deu erro na divisão', erro3);
             return;
         }

         console.log(`
            Resultado da soma = ${soma}
            Resultado da multiplicação = ${multiplicacao}
            Resultado da divisão = ${divisao}
         `);
     })
   })

})

