const ICrud = require('./interfaces/interfaceCrud');
class Postrgres extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log("O item foi salvo em Postgres");
    }
}

module.exports = Postrgres;
