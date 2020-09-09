const EventEmitter = require('events');
class MeusEmissor extends EventEmitter{

}

const meusEmissor = new MeusEmissor();
const nomeEvento = 'usuario:click';

meusEmissor.on(nomeEvento, function(click){
    console.log('usuario clicou', click);
});
/*
meusEmissor.emit(nomeEvento,'na barra de rolagem');

let cont = 0;
setInterval(() => {
    meusEmissor.emit(nomeEvento,'click' + (cont++)); 
}, 1000);
*/

// forma correta 
/*
const stdin = process.openStdin();
stdin.addListener('data', function(value){
    console.log(`Você digitou : ${value.toString().trim()}`)
})
*/
// forma errada de captura de evento utilizando promises

const stdin = process.openStdin();

function main(){
    return new Promise (function(resolve, reject){

        stdin.addListener('data', function(value){
            //console.log(`Você digitou : ${value.toString().trim()}`);
            return resolve(value);
        });

    });
}


main().then(function(resultado){
    console.log('Resultado', resultado.toString().trim())
})
