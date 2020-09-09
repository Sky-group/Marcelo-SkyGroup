function obterUsuario(callback){
setTimeout(() => {
    return callback(null,{
        id: 1,
        nome: 'Marcelo',
        data: new Date()

    })
}, 1000);
}

function obterTelefone(idUsuario,callback){
    setTimeout(() => {
        return callback(null,{
            ddd: 41,
            telefone:'2315894'
        })
    }, 2000);
}

function obterEndereco(idUsuario,callback){
    setTimeout(() => {
        return callback(null,{
            endereco: 'ruas do sol',
            numero: 2
        })
    }, 2000);
}

/*
function resolverUsuario(erro,usuario){
    console.log('usuario',usuario);
}
*/

obterUsuario(function resolverUsuario(erro, usuario){
    if(erro){
        console.log('Deu ruim em usuário', erro);
        return;
    }

    obterTelefone(usuario.id,function resolverTelefone(erro2,telefone){
        if(erro2){
            console.log('Deu ruim em telefone', erro2);
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro3, endereco){
            if(erro3){
                console.log('Deu ruim em endereço', erro3);
                return;
            }

            console.log(`
                Nome: ${usuario.nome}
                Endereço: ${endereco.endereco}, nº ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
});

