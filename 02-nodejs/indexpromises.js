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


    const usuarioPromise = obterUsuario();

    usuarioPromise
    
   .then(function( usuario){
        return obterTelefone(usuario.id)
        .then( function resolverTelefone(result){
            return {
                usuario: {
                    id: usuario.id,
                    nome : usuario.nome,
                    data : usuario.data
                },
                telefone: result
            }
        })
    })
    .then( function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then( function resolveEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then( function(resultado){
     //   console.log('resultado', resultado);

        console.log(`
           Id: ${resultado.usuario.id},
           Nome:   ${resultado.usuario.nome},
           Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
           Endereço: ${resultado.endereco.endereco}, ${resultado.endereco.numero}
        
        `);
    })
    .catch( function(erro){
        Console.log('Deu treta', erro);
    
    })