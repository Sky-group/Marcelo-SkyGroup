// comando para listar as imagens que estão rodando
//docker ps

const { DatabaseError } = require("sequelize/types")

//docker exec -it 5a5cf67ccf29 mongo -u marcelocardoso -p minhasenhasecreta --authenticationDatabase heroes

//databases
show dbs

//muda o contexto para uma database
use heroes

// mostra tabelas (coleções)
show collections


db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1980-01-25'
})

db.heroes.find()
db.heroes.find().pretty()

for(let i = 0; i <= 2000; i++){
    db.heroes.insert({
        nome: `Flash-Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1980-01-25'
    })
}

db.hores.count()
db.heroes.findOne()
db.heroes.find().limit(50).sort({nome:-1})
db.heroes.find({},{poder: 1, _id:0})


//CREATE 
db.heroes.insert({
    nome: `Flash-Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1980-01-25'
})

//READ
db.heroes.find()

//UPDATE
 //Desta forma, ao realizar o update os outros atributos são deletados, neste caso a data de nascimento  desaparece
db.heroes.update({_id: ObjectId("5f9f020f1352e764e8b981c7")}, 
        {nome: 'Mulher maravilha'})

        
db.heroes.update({_id: ObjectId("5f9f03b81352e764e8b981c9")}, 
        {$set:{nome: 'Lanterna verde'}})

//DELETE
db.heroes.remove({nome: 'Mulher maravilha'})
db.heroes.remove({})