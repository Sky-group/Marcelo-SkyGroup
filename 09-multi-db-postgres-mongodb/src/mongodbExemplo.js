//para instalar o mongoose : npm install mongoose
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://marcelocardoso:minhasenhasecreta@localhost:27017/heroes',
    {useNewParser: true}, function(error){
        if(!error) return;

        console.log('Falha na conexão', error)
    });

const connetion = Mongoose.connection;

/* modos de como declarar um função
function nomeFuncao(){

}

const minhaFuncao = function(){

}

const minhaFuncaoArrow = () =>{

}
const minhaFuncaoArrow = (params) => console.log(params)
*/
connetion.once('open', () => console.log('database rodando !'))
/*
setTimeout(() => {
    const state = connetion.readyState;
    console.log('state', state)
}, 1000);
*/
/*
 0: Disconectado,
 1: Conetado,
 2: Conectando,
 3: Disconectando
*/

const heroisSchema = Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    poder:{
        type: String,
        required: true
    },
    insertedAt:{
        type:Date,
        default: new Date()
    }
});

const modelo = Mongoose.model('heroi', heroisSchema);

async function main(){

    const resultadoCadastrar = await modelo.create({
        name:'Homem-aranha',
        poder: 'pode de aranha'
    });

    console.log('resultadoCadastrar', resultadoCadastrar);


    const listItens = await modelo.find();

    console.log('Listando todos', listItens);
}
main();
