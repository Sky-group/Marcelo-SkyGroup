const axios = require('axios');
const URL = `https://swapi.dev/api/people`;

async function obterPessoa(nome){

    const url = `${URL}/?search=${nome}&format=json`;
    const result =  await axios.get(url);
    return result.data.results.map(resultadoFormatado);
}


function resultadoFormatado(item){
    return {
            nome: item.name,
            peso : item.height
    }
}

module.exports = {
    obterPessoa
}