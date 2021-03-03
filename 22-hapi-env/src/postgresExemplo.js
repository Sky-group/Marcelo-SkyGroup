// npm install sequelizen
// npm install pg-hstore pg

const Sequelize = require('sequelize');
const driver = new Sequelize(
    'heroes',
    'marcelocardoso',
    'minhasenhasecreta',{
        host:'localhost',
        dialect:'postgres',
        quoteIdentifiers:false,
        operatorsAliases:false
    }

)

async function main(){
    const Herois = driver.define('heroes',{
        id:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            required: true
        },
        poder:{
            type: Sequelize.STRING,
            required: true 
        }
    },{
        tableName:'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync();
  /* await Herois.create({
       nome:'marcelo',
       poder:'dormir'
   });
  */
   const result = await Herois.findAll({
        raw:true,
      //  attributes: ['nome', 'poder']
    });

    

    console.log('result', result)
/*
    console.log('result', 
    await Herois.findAll({ raw: true, attributes: ['nome', 'poder', 'id'] })
    );
*/
}

main();