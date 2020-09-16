const service = require('./service');

Array.prototype.meuMap = function( callback){
    const novoArrayMapeado = [];
    for( let indece = 0; indece <= this.length-1; indece++){
        const resultado = callback(this[indece], indece);
        novoArrayMapeado.push(resultado);
    }

    return novoArrayMapeado;
}
async function main(){

    try {
        const results = await service.obterPessoa('a');
       /* const names=[];
        results.results.forEach(function (item) {
            names.push(item.name);
        });
        */
       /* 
         Primeira forma de resolver utilizando map
       const names = results.results.map(function(pessoa){
           return pessoa.name;
       })
       */
       /*
        // 02 - Forma de resolver utilizando map e apenas uma linha

        const names = results.results.map(pessoa => pessoa.name);
       */
      const names = results.results.meuMap(function(pessoa, indece){
          return `[${indece}]${pessoa.name}`;
      })
        console.log('nomes', names);
    } catch (error) {
        console.log('Error', error);
    }

}
main();