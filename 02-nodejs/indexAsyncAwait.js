const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(){
    return new Promise(function(resolve, reject){

        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Marcelo',
                data: new Date()
        
            })
        }, 1000);
    })
        
    }
    
    function obterTelefone(idUsuario){

        return new Promise(function resolvepromise(resolve, reject){
            
            setTimeout(() => {
                return resolve({
                    ddd: 41,
                    telefone:'2315894'
                })
            }, 2000);
        })
    }
    
    function obterEndereco(idUsuario, callback){
        
            setTimeout(() => {
                return callback(null,{
                    endereco: 'ruas do sol',
                    numero: 2
                })
            }, 2000);

        
    }

main();
    async function main(){
        try {
            
            const usuario =  await obterUsuario();

           /*
            const telefone = await obterTelefone(usuario.id);
            const endereco = await obterEnderecoAsync(usuario.id)
            */
           const resultado = await Promise.all([
               obterTelefone(usuario.id),
               obterEnderecoAsync(usuario.id)
            ])

            console.log (`
                 
             Id : ${usuario.id},
             Nome: ${usuario.nome},
             Telefone: (${resultado[0].ddd}) ${resultado[0].telfone},
             Endereço : ${resultado[1].endereco}, nº ${resultado.numero}
            
            `)

        } catch (error) {
            
            console.log('Deu erro', error);
        }
    }