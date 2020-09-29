const { get } = require('axios');
const URL = `https://swapi.dev/api/people`;


async function obeterPessoas(nome){

    const url = `${URL}/?search=${nome}&format=json`;
    const response = await get(url);
    console.log(response.data);
    if(nome === 'Chewbacca'){
        return response.data.results.map(formatarSaida2);
    }
    return response.data.results.map(formatarSaida);
}

function formatarSaida2(item){
    return {
        nome: item.name,
        peso: item.height,
        cor_cabelo : item.hair_color,
        cor_olhos: item.eye_color
    }
}
function formatarSaida(item){
    return {
        nome: item.name,
        peso:item.height
    }
}
module.exports = {

    obeterPessoas
}